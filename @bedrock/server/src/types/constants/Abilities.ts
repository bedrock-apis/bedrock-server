import { AbilityLayerFlag } from "../enums";

export const DEFAULT_ABILITIES = {
	[AbilityLayerFlag.FlySpeed]: true,
	[AbilityLayerFlag.WalkSpeed]: true,
	[AbilityLayerFlag.MayFly]: false,
	[AbilityLayerFlag.Flying]: false,
	[AbilityLayerFlag.NoClip]: false,
	[AbilityLayerFlag.OperatorCommands]: false,
	[AbilityLayerFlag.Teleport]: false,
	[AbilityLayerFlag.Invulnerable]: false,
	[AbilityLayerFlag.Muted]: false,
	[AbilityLayerFlag.WorldBuilder]: false,
	[AbilityLayerFlag.InstantBuild]: true,
	[AbilityLayerFlag.Lightning]: false,
	[AbilityLayerFlag.Build]: true,
	[AbilityLayerFlag.Mine]: true,
	[AbilityLayerFlag.DoorsAndSwitches]: true,
	[AbilityLayerFlag.OpenContainers]: true,
	[AbilityLayerFlag.AttackPlayers]: true,
	[AbilityLayerFlag.AttackMobs]: true,
};
