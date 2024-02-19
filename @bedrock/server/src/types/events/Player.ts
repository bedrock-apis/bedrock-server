import type { PlayerClient } from "../../minecraft";
import { PublicEvent } from "./PublicEvent";

export class PlayerEventData {
	public readonly port;
	public readonly player;
	public readonly engine;
	public readonly entity;
	public constructor(player: PlayerClient) {
		this.player = player;
		this.entity = player.player;
		this.engine = player.engine;
		this.port = player.port;
	}
}
export class PlayerEvent<T extends PlayerEventData> extends PublicEvent<[T]> {}

export class PlayerJoinEventData extends PlayerEventData {}
export class PlayerSpawnEventData extends PlayerEventData {}
export class PlayerLeaveEventData extends PlayerEventData {}

export class PlayerJoinEvent extends PlayerEvent<PlayerJoinEventData> {}
export class PlayerSpawnEvent extends PlayerEvent<PlayerSpawnEventData> {}
export class PlayerLeaveEvent extends PlayerEvent<PlayerLeaveEventData> {}
