import type { HostMessageType, GameMessageType } from "./MessageTypes";
import type { ClientConnectData, ClientData } from "./classes";
import type { Config } from "./interfaces";

export interface GameMessageMapping {
	[GameMessageType.StartServer]: Config;
	[K: number]: unknown;
}
export interface HostMessageMapping {
	[K: number]: unknown;
}
export interface GameTaskMapping {
	[GameMessageType.StartServer]: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HostTaskMapping {}
