import { GameMessageType } from "../../../communcation";
import type { Config} from "../../../types";
import { Logger, PlayerSpawnEvent } from "../../../types";
import { EnginePort } from "../port/engine-port";

export class Engine{
	protected entityIndex = 1n;
	public readonly logger = new Logger("Engine");
	public readonly port = new EnginePort();
	public readonly onPlayerSpawn = new PlayerSpawnEvent;
	public async StartGame(config: Config) {
		return this.port.PostTask(GameMessageType.StartServer, config)
			.catch(this.logger.error)
			.then((e) => e ?? false);
	}
	public GetNewEntityId(){ return this.entityIndex++; }
}
