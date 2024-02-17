import type { Buffer } from "node:buffer";
import { inflateRawSync } from "node:zlib";
import { BinaryStream } from "@serenityjs/binarystream";
import { Priority } from "@serenityjs/raknet-protocol";
import type { Connection } from "@serenityjs/raknet-server";
import { ClientConnectEvent, ClientDisconnectEvent } from "../Events";
import type { DisconnectReason } from "../enums";
import { CompressionMethod } from "../enums";
import type { ClientData, LoginPacket, ProtocolPacket, RequestNetworkSettingsPacket, ResourcePackClientResponse } from "../protocol";
import { DisconnectPacket, PacketIds, PacketManager } from "../protocol";
import { GAME_HEADER } from "../threading";
import { Logger } from "../utils";
import { Server } from "./Server";

interface PacketResolverMap {
	[PacketIds.ResourcePackClientResponse]: ResourcePackClientResponse
	[PacketIds.RequestNetworkSettings]: RequestNetworkSettingsPacket;
	[PacketIds.Login]: LoginPacket;
}
type PacketResolver = {
	[k in keyof PacketResolverMap]?: (client: Client, packet: PacketResolverMap[k], packetId: number) => any;
} & {
	[k: number]: (client: Client, packet: ProtocolPacket, packetId: number) => any;
};
export const ClientPacketResolvers: PacketResolver = {};
export class Client {
	public get isGameReady() {
		return this.server.gameReadyClients.has(this);
	}
	public set isGameReady(v) {
		if (v) this.server.gameReadyClients.add(this);
		else this.server.gameReadyClients.delete(this);
	}
	public hasCompression = false;
	public hasEncryption = false;
	public clientData?: ClientData;
	public readonly connection;
	public readonly server;
	public readonly port;
	public readonly logger = new Logger("Client");
	public readonly onDisconnect = new ClientDisconnectEvent();
	public readonly onConnect = new ClientConnectEvent();
	public constructor(connection: Connection, server: Server) {
		this.connection = connection;
		this.server = server;
		this.port = server.port;
	}
	private async processPacket(packet: ProtocolPacket) {
		const packetId = packet.packetId;
		console.log("Packet: " + PacketIds[packetId]);
		if (packetId in ClientPacketResolvers) ClientPacketResolvers[packetId](this, packet, packetId);
		else this.logger.warn("No resolvers for " + PacketIds[packetId]);
	}
	protected async _resolveData(buff: Buffer) {
		let buffer = buff;
		// Valid Game Packet Header
		if (buffer[0] !== GAME_HEADER) return this.logger.warn("Invalid packet game header", buffer[0]);

		// Compression
		if (this.hasCompression) {
			const compressionMethod = buffer[1];
			buffer = (compressionMethod === CompressionMethod.None)?buffer.slice(2):inflateRawSync(buffer.slice(2));
		} else {
			buffer = buffer.slice(1);
		}

		for (const packet of PacketManager.DestructPayload(new BinaryStream(buffer), this.logger)) {
			this.processPacket(packet).catch(this.logger.error);
		}
	}
	public post(...packets: ProtocolPacket[]) {
		const frame = Server.BuildNetworkFrame(this.hasCompression, ...packets);
		this.connection.sendFrame(frame, Priority.Normal);
	}
	public disconnect(message: string, reason: DisconnectReason, hideDisconnectScreen: boolean = false) {
		const connection = new DisconnectPacket();
		connection.message = message;
		connection.reason = reason;
		connection.hideDisconnectionScreen = hideDisconnectScreen ?? false;
		this.post(connection);
	}
}
