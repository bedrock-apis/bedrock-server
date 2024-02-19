import type { MessagePort } from "node:worker_threads";
import type { GameMessageMapping, GameTaskMapping, HostMessageMapping, HostTaskMapping } from "../communcation";
import { GameMessageType, ThreadPort } from "../communcation";
import { Logger } from "../types";
import type { Server } from "./Server";

export class ServerPort extends ThreadPort<
	MessagePort,
	GameMessageMapping,
	HostMessageMapping,
	HostTaskMapping,
	GameTaskMapping
> {
	public readonly server;
	public constructor(port: MessagePort, server: Server) {
		super(port, GameMessageType, new Logger("Server-Port"));
		this.server = server;
		this.RESOLVERS[GameMessageType.Debug] = (n) => (Logger.DEBUG = n);
		this.RESOLVERS[GameMessageType.StartServer] = (config, taskId, type) => {
			this.ResolveTask(taskId, type, server.Start(config));
		};
	}
}
