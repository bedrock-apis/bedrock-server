import { inflateRawSync } from "node:zlib";
import { PacketIds, PacketManager, BinaryStream } from "@bedrock/base";
import type { PacketLike, ProtocolPacket, Buffer } from "@bedrock/base";
import type {
	DisconnectReason,
	ResourcePackClientResponsePacket,
	RequestNetworkSettingsPacket,
	LoginPacket,
	MovePlayerPacket,
	SetLocalPlayerAsInitializedPacket,
	Skin,
	PacketViolationWarningPacket,
	InteractPacket,
	ContainerClosePacket,
	ContainerOpenPacket,
	RequestChunkRadiusPacket,
	PlayerActionPacket,
	TextPacket,
} from "@bedrock/protocol";
import { CompressionMethod, DisconnectPacket } from "@bedrock/protocol";
import { Priority } from "@serenityjs/raknet-protocol";
import type { Connection } from "@serenityjs/raknet-server";
import type { Player } from "../minecraft/players/player.js";
import { ClientConnect, ClientDataRecieved, ClientDisconnect } from "../types/events/client.js";
import { GAME_HEADER, Logger } from "../types/index.js";
import { Server } from "./Server.js";

interface PacketResolverMap {
	[PacketIds.ResourcePackClientResponse]: ResourcePackClientResponsePacket;
	[PacketIds.RequestChunkRadius]: RequestChunkRadiusPacket;
	[PacketIds.RequestNetworkSettings]: RequestNetworkSettingsPacket;
	[PacketIds.Login]: LoginPacket;
	[PacketIds.MovePlayer]: MovePlayerPacket;
	[PacketIds.SetLocalPlayerAsInitialized]: SetLocalPlayerAsInitializedPacket;
	[PacketIds.PacketViolationWarning]: PacketViolationWarningPacket;
	[PacketIds.Interact]: InteractPacket;
	[PacketIds.ContainerClose]: ContainerClosePacket;
	[PacketIds.ContainerOpen]: ContainerOpenPacket;
	[PacketIds.Interact]: InteractPacket;
	[PacketIds.PlayerAction]: PlayerActionPacket;
	[PacketIds.Text]: TextPacket;
}
type PacketResolver = {
	[k in keyof PacketResolverMap]?: (client: Client, packet: PacketResolverMap[k], packetId: number) => any;
} & {
	[k: number]: (client: Client, packet: ProtocolPacket, packetId: number) => any;
};
export const ClientPacketResolvers: PacketResolver = {};
export class Client {
	public readonly isDisconnected: boolean = false;
	public readonly connection;
	public readonly server;
	public readonly engine;
	public readonly guid;
	public readonly logger = new Logger(Logger.FromRGB(156, 200, 250, true, "Client"));
	public readonly onConnect = new ClientConnect();
	public readonly onDisconnect = new ClientDisconnect();
	public readonly onDataRecieve = new ClientDataRecieved();
	public hasCompression = false;
	public hasEncryption = false;
	public skin!: Skin;
	public displayName!: string;
	public xuid!: string;
	public uuid!: string;
	public playfabId!: string;
	public player!: Player;
	public constructor(connection: Connection, server: Server) {
		this.connection = connection;
		this.server = server;
		this.engine = server.engine;
		this.guid = connection.guid;
		this.onDataRecieve.subscribe((d) => this._resolveData(d.data));
	}
	public post(packets: Iterable<PacketLike>) {
		if (this.isDisconnected) return this.logger.warn("Trying to send packet to disconnected client");
		const frame = Server.BuildNetworkFrame(this.hasCompression, packets);
		this.connection.sendFrame(frame, Priority.Normal);
	}
	public disconnect(message: string, reason: DisconnectReason, hideDisconnectScreen: boolean = false) {
		const connection = new DisconnectPacket();
		connection.message = message;
		connection.reason = reason;
		connection.hideDisconnectionScreen = hideDisconnectScreen ?? false;
		this.post([connection]);
		(this as any).isDisconnected = true;
	}
	private async processPacket(packet: ProtocolPacket) {
		const packetId = packet.packetId;
		if (packetId in ClientPacketResolvers) ClientPacketResolvers[packetId](this, packet, packetId);
		else this.logger.warn("No resolvers for " + PacketIds[packetId]);
	}
	protected _resolveData(buff: Buffer) {
		let buffer = buff;
		// Valid Game Packet Header
		if (buffer[0] !== GAME_HEADER) return this.logger.warn("Invalid packet game header", buffer[0]);

		// Compression
		if (this.hasCompression) {
			const compressionMethod = buffer[1];
			buffer = compressionMethod === CompressionMethod.None ? buffer.slice(2) : inflateRawSync(buffer.slice(2));
		} else {
			buffer = buffer.slice(1);
		}

		for (const packet of PacketManager.DestructPayload(new BinaryStream(buffer), this.logger))
			this.processPacket(packet).catch(this.logger.error);
	}
}
