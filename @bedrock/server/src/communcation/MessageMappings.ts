import type { Config, PlayerInitInfo } from "../types";
import type { HostMessageType, GameMessageType } from "./MessageTypes";
import type { ClientConnectData, PostMessage , ClientData } from "./common";
import type { PermissionClientData } from "./common/client";

export interface GameMessageMapping {
	[GameMessageType.StartServer]: Config;
	[GameMessageType.Debug]: boolean;
	[GameMessageType.KickPlayer]: { message: string };
	[GameMessageType.SendMessage]: PostMessage;
	[GameMessageType.BroatcastMessage]: {message: string};
	[GameMessageType.UpdatePermissions]: PermissionClientData;
	[K: number]: unknown;
}
export interface HostMessageMapping {
	[HostMessageType.PlayerJoin]: ClientConnectData;
	[HostMessageType.PlayerLeave]: ClientData;
	[HostMessageType.PlayerSpawn]: ClientData
	[K: number]: unknown;
}
export interface GameTaskMapping {
	[GameMessageType.StartServer]: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HostTaskMapping {
	[HostMessageType.PlayerJoin]: PlayerInitInfo
}
