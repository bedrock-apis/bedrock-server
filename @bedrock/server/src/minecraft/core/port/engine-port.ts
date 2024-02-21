import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import type {  GameMessageMapping, GameTaskMapping, HostMessageMapping, HostTaskMapping } from "../../../communcation";
import { GameMessageType, HostMessageType, ThreadPort } from "../../../communcation";
import { Logger } from "../../../types";
import type { Engine } from "../engine";
import { EngineResolvers } from "./resolvers";

export class EnginePort extends ThreadPort<
	Worker,
	HostMessageMapping,
	GameMessageMapping,
	GameTaskMapping,
	HostTaskMapping
> {
	public readonly engine;
	public constructor(engine: Engine) {
		super(new Worker(resolve(__dirname, "../../../server")), HostMessageType);
		(this as any).RESOLVERS = EngineResolvers;
		this.engine = engine;
		this.Post(GameMessageType.Debug, Logger.DEBUG);
	}
}
