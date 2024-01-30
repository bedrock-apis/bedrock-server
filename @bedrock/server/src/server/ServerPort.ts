import type {MessagePort} from "node:worker_threads";
import type { GameMessageMapping, HosMessageMapping } from "../threading";
import { ThreadGameMessageType, ThreadPort } from "../threading";
import { Logger } from "../utils";
import type { Server } from "./Server";

export class ServerPort extends ThreadPort<MessagePort, GameMessageMapping, HosMessageMapping>{
	public readonly server;
	public constructor(port: MessagePort, server: Server){
		super(port, ThreadGameMessageType, new Logger("Server-Port"));
		this.server = server;
	}
}
