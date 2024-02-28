import type { CommandPermissionLevel, PermissionLevel } from "../../../types";
import type { ClientData } from "../General";

export interface PermissionClientData extends ClientData{
    abilities: number;
    commandPermission: CommandPermissionLevel;
    permission: PermissionLevel;
}
