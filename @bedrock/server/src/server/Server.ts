import { Buffer } from "node:buffer";
import type { MessagePort } from "node:worker_threads";
import { deflateRawSync } from "node:zlib";
import { BinaryStream } from "@serenityjs/binarystream";
import { Frame, Priority, Reliability } from "@serenityjs/raknet-protocol";
import type { Connection } from "@serenityjs/raknet-server";
import { Server as Network } from "@serenityjs/raknet-server";
import { ClientConnectEventData, ClientDisconnectEvent, ClientDisconnectEventData } from "../Events";
import { PacketManager, type ProtocolPacket } from "../protocol";
import { GAME_HEADER, HostMessageType } from "../threading";
import type { Config } from "../threading/Types";
import { Logger, TriggerEvent } from "../utils";
import { Client } from "./Client";
import { ServerPort } from "./ServerPort";

export class Server {
	public readonly withConfig!: Config;
	public readonly logger!: Logger;
	public readonly port;
	public readonly network!: Network;
	public IsNetworkRunning = false;
	public readonly clients = new Map<bigint, Client>();
	public readonly gameReadyClients = new Set<Client>();
	public constructor(port: MessagePort) {
		this.port = new ServerPort(port, this);
	}
	public Start(config: Config) {
		if (this.IsNetworkRunning) return false;
		if (!this.network)
			(this as any).network = new Network(config.address, config.port, config.maxConnections ?? 10) as any;
		this.network.on("connect", (c) => this._onConnect(c));
		this.network.on("disconnect", async (c) => this._onDisconnect(c));
		this.network.on("encapsulated", async (c, d) => this._onDataReceive(c, d));
		(this as any).withConfig = config;
		return this.network.start(config.protocol, config.version);
	}
	public async broadcast(...packets: ProtocolPacket[]) {
		const frame = Server.BuildNetworkFrame(true, ...packets);
		for (const client of this.gameReadyClients) client.connection.sendFrame(frame, Priority.Normal);
	}

	private _onConnect(c: Connection) {
		if (this.clients.has(c.guid)) return this.logger.debug("Got duplicate connection request from " + c.guid);
		const client = new Client(c, this);
		this.clients.set(c.guid, client);
		TriggerEvent(client.onConnect, new ClientConnectEventData(client)).catch(client.logger.error);
	}
	private async _onDisconnect(c: Connection) {
		if (!this.clients.has(c.guid)) return this.logger.debug("Got disconnection request from unconnected user" + c.guid);
		const client = this.clients.get(c.guid) as Client;
		await TriggerEvent(client.onDisconnect, new ClientDisconnectEventData(client)).catch(client.logger.error);
		this.clients.delete(c.guid);
		return true;
	}
	private async _onDataReceive(c: Connection, data: Buffer) {
		if (!this.clients.has(c.guid)) return this.logger.debug("Received packet from unconnected client " + c.guid);
		const client = this.clients.get(c.guid) as Client;
		// @ts-expect-error Its protected
		client._resolveData(data).catch(client.logger.error);
	}

	/// ////////////////////////////////////////////
	/// ///////////////////////// Static
	/// ////////////////////////////////////////////
	public static BuildNetworkFrame(useCompression: boolean, ...packets: ProtocolPacket[]) {
		// Prepare an array of buffers
		const stream = new BinaryStream();
		// We will first loop each packet and emit them through the event loop.
		// This will allow the ability to cancel or modify the packet.
		PacketManager.StructPayload(stream, packets, this.prototype.logger);

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
		const payload = Buffer.concat([Buffer.from([GAME_HEADER]), encrypted]);

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

// Loger
// @ts-expect-error ReadOnly
Server.prototype.logger = new Logger("Server");
