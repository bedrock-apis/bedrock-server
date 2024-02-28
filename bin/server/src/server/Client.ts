import type { Buffer } from "node:buffer";
import { inflateRawSync } from "node:zlib";
import { BinaryStream } from "@serenityjs/binarystream";
import { Priority } from "@serenityjs/raknet-protocol";
import type { Connection } from "@serenityjs/raknet-server";
import type { ClientData, LoginPacket, MovePlayerPacket, ProtocolPacket, RequestNetworkSettingsPacket, ResourcePackClientResponsePacket, SetLocalPlayerAsInitializedPacket } from "../protocol";
import { DisconnectPacket, PacketIds, PacketManager } from "../protocol";
import type { DisconnectReason, PlayerInitInfo } from "../types";
import { GAME_HEADER , ClientConnectEvent, ClientDisconnectEvent , CompressionMethod, Logger } from "../types";
import { Server } from "./Server";

interface PacketResolverMap {
	[PacketIds.ResourcePackClientResponse]: ResourcePackClientResponsePacket
	[PacketIds.RequestNetworkSettings]: RequestNetworkSettingsPacket;
	[PacketIds.Login]: LoginPacket;
	[PacketIds.MovePlayer]: MovePlayerPacket;
	[PacketIds.SetLocalPlayerAsInitialized]: SetLocalPlayerAsInitializedPacket
}
type PacketResolver = {
	[k in keyof PacketResolverMap]?: (client: Client, packet: PacketResolverMap[k], packetId: number) => any;
} & {
	[k: number]: (client: Client, packet: ProtocolPacket, packetId: number) => any;
};
export const ClientPacketResolvers: PacketResolver = {};
export class Client {
	public isLogged = false;
	public hasCompression = false;
	public hasEncryption = false;
	public entityId: bigint = -1n;
	public runtimeId: bigint = -1n;
	public clientData?: ClientData;
	public initData!: PlayerInitInfo;
	public readonly xuid!: string;
	public readonly uuid!: bigint;
	public readonly displayName!: string;
	public readonly isDisconnected = false;
	public readonly connection;
	public readonly server;
	public readonly port;
	public readonly logger = new Logger(Logger.FromRGB(156,200,250,true,"Client"));
	public readonly onDisconnect = new ClientDisconnectEvent();
	public readonly onConnect = new ClientConnectEvent();
	public constructor(connection: Connection, server: Server) {
		this.connection = connection;
		this.server = server;
		this.port = server.port;
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
			buffer = (compressionMethod === CompressionMethod.None)?buffer.slice(2):inflateRawSync(buffer.slice(2));
		} else {
			buffer = buffer.slice(1);
		}

		for (const packet of PacketManager.DestructPayload(new BinaryStream(buffer), this.logger)) {
			this.processPacket(packet).catch(this.logger.error);
		}
	}
	public get isInitialized() {
		return this.server.loggedClients.has(this);
	}
	public set isInitialized(v) {
		if (v) this.server.loggedClients.add(this);
		else this.server.loggedClients.delete(this);
	}
	public post(...packets: ProtocolPacket[]) {
		if(this.isDisconnected) return this.logger.warn("Trying to send packet to disconnected client");
		const frame = Server.BuildNetworkFrame(this.hasCompression, ...packets);
		this.connection.sendFrame(frame, Priority.Normal);
	}
	public disconnect(message: string, reason: DisconnectReason, hideDisconnectScreen: boolean = false) {
		const connection = new DisconnectPacket();
		connection.message = message;
		connection.reason = reason;
		connection.hideDisconnectionScreen = hideDisconnectScreen ?? false;
		this.post(connection);
		(this as any).isDisconnected = true;
	}
	public setPlayerAsLogged(initialValue: PlayerInitInfo){
		this.entityId = initialValue.entityId;
		this.runtimeId = initialValue.runtimeId;
		this.isLogged = true;
		this.initData = initialValue;
	}
}
