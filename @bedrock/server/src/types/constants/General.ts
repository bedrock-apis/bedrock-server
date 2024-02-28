import { AbilityLayerFlag } from "@bedrock/protocol";

export const GAME_HEADER = 0xfe;
export const RESET_COLOR = "\u001B[0m";
export const DEFUALT_PLAYER_ABILITY = AbilityLayerFlag.InstantBuild 
| AbilityLayerFlag.WalkSpeed 
| AbilityLayerFlag.FlySpeed
| AbilityLayerFlag.MayFly 
| AbilityLayerFlag.Build
| AbilityLayerFlag.Mine
| AbilityLayerFlag.DoorsAndSwitches
| AbilityLayerFlag.AttackPlayers
| AbilityLayerFlag.AttackMobs;
