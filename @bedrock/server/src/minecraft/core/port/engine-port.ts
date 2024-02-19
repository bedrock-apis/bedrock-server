import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import type {  GameMessageMapping, GameTaskMapping, HostMessageMapping, HostTaskMapping } from "../../../communcation";
import { GameMessageType, HostMessageType, ThreadPort } from "../../../communcation";
import { EngineResolvers } from "./resolvers";

export class EnginePort extends ThreadPort<
	Worker,
	HostMessageMapping,
	GameMessageMapping,
	GameTaskMapping,
	HostTaskMapping
> {
	public constructor() {
		super(new Worker(resolve(__dirname, "../../../server")), HostMessageType);
		(this as any).RESOLVERS = EngineResolvers;
		this.Post(GameMessageType.Debug, true);
	}
}
