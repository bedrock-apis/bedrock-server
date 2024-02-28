import { DEFAULT_ABILITIES } from "../constants";
import { AbilityLayerFlag, CommandPermissionLevel, PermissionLevel } from "../enums";

/**
 * The ability manager for a player.
 */
export class Abilities {
	public permissionLevel: number = PermissionLevel.Member;
	public commandPermissionLevel: number = CommandPermissionLevel.Normal;
	public flySpeed = 0.05;
	public walkSpeed = 0.1;
	// Initialize all abilities to their default values.
	protected [AbilityLayerFlag.FlySpeed]!: boolean;
	protected [AbilityLayerFlag.WalkSpeed]!: boolean;
	protected [AbilityLayerFlag.MayFly]!: boolean;
	protected [AbilityLayerFlag.Flying]!: boolean;
	protected [AbilityLayerFlag.NoClip]!: boolean;
	protected [AbilityLayerFlag.OperatorCommands]!: boolean;
	protected [AbilityLayerFlag.Teleport]!: boolean;
	protected [AbilityLayerFlag.Invulnerable]!: boolean;
	protected [AbilityLayerFlag.Muted]!: boolean;
	protected [AbilityLayerFlag.WorldBuilder]!: boolean;
	protected [AbilityLayerFlag.InstantBuild]!: boolean;
	protected [AbilityLayerFlag.Lightning]!: boolean;
	protected [AbilityLayerFlag.Build]!: boolean;
	protected [AbilityLayerFlag.Mine]!: boolean;
	protected [AbilityLayerFlag.DoorsAndSwitches]!: boolean;
	protected [AbilityLayerFlag.OpenContainers]!: boolean;
	protected [AbilityLayerFlag.AttackPlayers]!: boolean;
	protected [AbilityLayerFlag.AttackMobs]!: boolean;
 	public constructor(){
		for(const flagId of Object.keys(DEFAULT_ABILITIES)) this[flagId as "1"] = DEFAULT_ABILITIES[flagId as "1"];
	}
	public setAbility(flag: AbilityLayerFlag, value?: boolean){
		this[flag as 1] = value??DEFAULT_ABILITIES[flag as 1];
		return this;
	}
	public getFlags(){
		let flags = 0;
		for(const f of Object.values(AbilityLayerFlag)) if(this[f as 1]) flags |= f as number;
		return flags;
	}
}
