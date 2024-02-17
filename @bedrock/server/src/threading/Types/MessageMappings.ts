import type { HostMessageType, GameMessageType } from "./MessageTypes";
import type { ClientConnectData } from "./classes";
import type { Config } from "./interfaces";

export interface GameMessageMapping {
	[GameMessageType.StartServer]: Config;
	[GameMessageType.Debug]: boolean;
	[GameMessageType.KickPlayer]: { message: string };
	[K: number]: unknown;
}
export interface HostMessageMapping {
	[HostMessageType.PlayerJoin]: ClientConnectData;
	[HostMessageType.PlayerLeave]: ClientConnectData;
	[K: number]: unknown;
}
export interface GameTaskMapping {
	[GameMessageType.StartServer]: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HostTaskMapping {}
