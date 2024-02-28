import { GameMessageType } from "../../../communcation";
import type { Config} from "../../../types";
import { Logger, PlayerJoinEvent, PlayerSpawnEvent } from "../../../types";
import type { PlayerClient } from "../../entities";
import { EnginePort } from "../port";

export class Engine{
	protected entityIndex = 1n;
	public readonly logger = new Logger("Engine");
	public readonly port = new EnginePort(this);
	public readonly onPlayerSpawn = new PlayerSpawnEvent;
	public readonly onPlayerJoin = new PlayerJoinEvent;
	public readonly players: Map<bigint, PlayerClient> = new Map;
	public async StartGame(config: Config) {
		return this.port.PostTask(GameMessageType.StartServer, config)
			.catch(this.logger.error)
			.then((e) => e ?? false);
	}
	public GetNewEntityId(){ return this.entityIndex++; }
}
