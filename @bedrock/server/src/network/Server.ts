import {deflateRawSync} from "node:zlib";
import type { PacketLike, ProtocolPacket} from "@bedrock/base";
import { Buffer, BinaryStream, PacketManager } from "@bedrock/base";
import { CompressionMethod } from "@bedrock/protocol";
import { Frame, Priority, Reliability } from "@serenityjs/raknet-protocol";
import type { Connection} from "@serenityjs/raknet-server";
import { Server as Network } from "@serenityjs/raknet-server";
import type { Engine } from "../minecraft/engine.js";
import { TriggerEvent } from "../types/events/PublicEvent.js";
import { ClientJoinEvent, ClientLeaveEvent } from "../types/events/server.js";
import { GAME_HEADER, Logger } from "../types/index.js";
import type { Config } from "../types/index.js";
import { Client } from "./Client.js";

export class Server {
	public readonly network!: Network;
	public readonly engine: Engine;
	public readonly onClientJoin = new ClientJoinEvent();
	public readonly onClientLeave = new ClientLeaveEvent();
    
	public readonly logger = new Logger(Logger.FromRGB(190,130,40,true,"Server"));
	public readonly clients = new Map<bigint, Client>;
	public readonly gamers = new Set<Client>;
    
	public IsNetworkRunning = false;
	public protocol!: number;
	public constructor(engine: Engine) {
		this.engine = engine;
	}
	public Start(config: Config) {
		if (this.IsNetworkRunning) return false;
		if (!this.network)
			(this as any).network = new Network(config.address??"0.0.0.0", config.port??19_132, config.maxConnections ?? 10) as any;
		this.network.on("connect", (c) => this._onConnect(c));
		this.network.on("disconnect", async (c) => this._onDisconnect(c));
		this.network.on("encapsulated", async (c, d) => this._onDataReceive(c, d));
		(this as any).config = config;
		const success = this.network.start(this.protocol = config.protocol, config.version);
		this.logger.debug("Server is listening on", config.address??"0.0.0.0", "port:", config?.port??19_132);
		return success;
	}
	public broadcast(packets: Iterable<PacketLike>) {
		const frame = Server.BuildNetworkFrame(true, packets);
		let i = 0;
		for (const client of this.gamers) if(client.isDisconnected) continue; else { client.connection.sendFrame(frame, Priority.Normal); i++;}
		return i;
	}
	private _onConnect(c: Connection) {
		if (this.clients.has(c.guid)) return this.logger.debug("Got duplicate connection request from " + c.guid);
		const client = new Client(c, this);
		this.clients.set(c.guid, client);
		TriggerEvent(client.onConnect, {}).catch(this.logger.error);
	}
	private async _onDisconnect(c: Connection) {
		if (!this.clients.has(c.guid)) return this.logger.debug("Got disconnection request from unconnected user" + c.guid);
		const client = this.clients.get(c.guid) as Client;
		TriggerEvent(client.onDisconnect, {}).catch(this.logger.error);
		this.clients.delete(c.guid);
		this.gamers.delete(client);
		return true;
	}
	private async _onDataReceive(c: Connection, data: Buffer) {
		if (!this.clients.has(c.guid)) return this.logger.debug("Received packet from unconnected client " + c.guid);
		const client = this.clients.get(c.guid) as Client;
		TriggerEvent(client.onDataRecieve, {data}).catch(this.logger.error);
	}

	/// ////////////////////////////////////////////
	/// ///////////////////////// Static
	/// ////////////////////////////////////////////
	public static BuildNetworkFrame(useCompression: boolean, packets: Iterable<PacketLike>) {
		// Prepare an array of buffers
		const stream = new BinaryStream();
		// We will first loop each packet and emit them through the event loop.
		// This will allow the ability to cancel or modify the packet.
		PacketManager.StructPayload(stream, packets);

		// Then we will frame the packets into a single payload.
		// A framed payload starts with the size of the upcoming packet.
		// Followed by the packet buffer itself. This continues until all packets are framed.
		const framed = stream.getBuffer();

		// We will then check if compression is enabled for the session.
		// If so, we will deflate the framed payload.
		// If not, we will just use the framed payload.
		const deflated = useCompression ? deflateRawSync(framed) : framed;

		// We will then check if encryption is enabled for the session.
		// If so, we will encrypt the deflated payload.
		// If not, we will just use the deflated payload.
		// NOTE: Encryption is not implemented yet. So we will just use the deflated payload for now.
		// TODO: Implement encryption for the session.
		// eslint-disable-next-line sonarjs/no-all-duplicated-branches
		const encrypted = false ? deflated : deflated;

		// We will then construct the final payload with the game header and the encrypted compressed payload.
		const payload = Buffer.concat([Buffer.from(useCompression?[GAME_HEADER,0]:[GAME_HEADER, CompressionMethod.Zlib]), encrypted]);

		// Finally we will assemble a new frame with the payload.
		// The frame contains the reliability and priority of the packet.
		// As well as the payload itself.
		const frame = new Frame();
		frame.reliability = Reliability.ReliableOrdered;
		frame.orderChannel = 0;
		frame.body = payload;
		return frame;
	}
}
