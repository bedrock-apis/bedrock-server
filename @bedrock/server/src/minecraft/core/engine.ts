import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import type { Config, GameMessageMapping, GameTaskMapping, HostMessageMapping, HostTaskMapping } from "../../threading";
import { GameMessageType, HostMessageType, ThreadPort } from "../../threading";
import { EngineResolvers } from "./resolvers";

export class EnginePort extends ThreadPort<
	Worker,
	HostMessageMapping,
	GameMessageMapping,
	GameTaskMapping,
	HostTaskMapping
> {
	public constructor() {
		super(new Worker(resolve(__dirname, "../../server")), HostMessageType);
		(this as any).RESOLVERS = EngineResolvers;
		this.Post(GameMessageType.Debug, true);
	}
	public async StartGame(config: Config) {
		return this.PostTask(GameMessageType.StartServer, config)
			.catch(this.logger.error)
			.then((e) => e ?? false);
	}
}
