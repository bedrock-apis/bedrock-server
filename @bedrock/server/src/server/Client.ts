import type { Buffer } from "node:buffer";
import { inflateRawSync } from "node:zlib";
import { BinaryStream } from "@serenityjs/binarystream";
import { Priority } from "@serenityjs/raknet-protocol";
import type { Connection } from "@serenityjs/raknet-server";
import { ClientConnectEvent, ClientDisconnectEvent } from "../Events";
import { CompressionMethod } from "../enums";
import type { ProtocolPacket, RequestNetworkSettingsPacket } from "../protocol";
import { PacketIds, PacketManager } from "../protocol";
import { GAME_HEADER } from "../threading";
import { Logger } from "../utils";
import { Server } from "./Server";

interface PacketResolverMap {
	[PacketIds.RequestNetworkSettings]: RequestNetworkSettingsPacket;
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
	public readonly connection;
	public readonly server;
	public get port() {
		return this.server.port;
	}
	public readonly logger = new Logger("Client");
	public readonly onDisconnect = new ClientDisconnectEvent();
	public readonly onConnect = new ClientConnectEvent();
	public constructor(connection: Connection, server: Server) {
		this.connection = connection;
		this.server = server;
	}
	private async processPacket(packet: ProtocolPacket) {
		const packetId = packet.packetId;
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
			if (compressionMethod !== CompressionMethod.None) buffer = inflateRawSync(buffer.slice(2));
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
}
