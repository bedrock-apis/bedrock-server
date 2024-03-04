/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AbilityLayer, CommandPermissionLevel, PermissionLevel, AbilityLayerFlag, AbilityLayerType, UpdateAbilitiesPacket } from "@bedrock/protocol";
import { DEFUALT_PLAYER_ABILITY } from "../../types/index.js";
import type { Postable } from "../../types/postable.js";
import type { InternalPlayer } from "./player.js";

export abstract class Abilities implements Postable<UpdateAbilitiesPacket> {
	protected _player: InternalPlayer;
	protected _commandPermissionLevel = CommandPermissionLevel.Normal;
	protected _permissionLevel = PermissionLevel.Member;
	protected _flags = DEFUALT_PLAYER_ABILITY;
	protected _flySpeed = 0.05;
	protected _walkSpeed = 0.1;
	public abstract isValid(): boolean;
	protected constructor(player: InternalPlayer){
		this._player = player;
	}
	public abstract toPacket(): UpdateAbilitiesPacket;
	public get commandPermissionLevel(){return this._commandPermissionLevel;}
	public set commandPermissionLevel(v){ if(this.isValid()) this._player.updateMe(this); this._commandPermissionLevel = v;}
	public get permissionLevel(){return this._permissionLevel;}
	public set permissionLevel(v){ if(this.isValid()) this._player.updateMe(this); this._permissionLevel = v;}
	
	public get flyingSpeed(){return this._flySpeed;}
	public set flyingSpeed(v){ if(this.isValid()) this._player.updateMe(this); this._flySpeed = v;}
	public get walkingSpeed(){return this._walkSpeed;}
	public set walkingSpeed(v){ if(this.isValid()) this._player.updateMe(this); this._walkSpeed = v;}
	
	public get attackMobs(){return Boolean(this._flags & AbilityLayerFlag.AttackMobs); };
	public set attackMobs(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.AttackMobs:this._flags &= ~AbilityLayerFlag.AttackMobs; };
	public get attackPlayers(){return Boolean(this._flags & AbilityLayerFlag.AttackPlayers); };
	public set attackPlayers(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.AttackPlayers:this._flags &= ~AbilityLayerFlag.AttackPlayers; };
	public get build(){return Boolean(this._flags & AbilityLayerFlag.Build); };
	public set build(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Build:this._flags &= ~AbilityLayerFlag.Build; };
	public get count(){return Boolean(this._flags & AbilityLayerFlag.Count); };
	public set count(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Count:this._flags &= ~AbilityLayerFlag.Count; };
	public get doorsAndSwitches(){return Boolean(this._flags & AbilityLayerFlag.DoorsAndSwitches); };
	public set doorsAndSwitches(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.DoorsAndSwitches:this._flags &= ~AbilityLayerFlag.DoorsAndSwitches; };
	public get flySpeed(){return Boolean(this._flags & AbilityLayerFlag.FlySpeed); };
	public set flySpeed(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.FlySpeed:this._flags &= ~AbilityLayerFlag.FlySpeed; };
	public get flying(){return Boolean(this._flags & AbilityLayerFlag.Flying); };
	public set flying(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Flying:this._flags &= ~AbilityLayerFlag.Flying; };
	public get instantBuild(){return Boolean(this._flags & AbilityLayerFlag.InstantBuild); };
	public set instantBuild(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.InstantBuild:this._flags &= ~AbilityLayerFlag.InstantBuild; };
	public get invulnerable(){return Boolean(this._flags & AbilityLayerFlag.Invulnerable); };
	public set invulnerable(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Invulnerable:this._flags &= ~AbilityLayerFlag.Invulnerable; };
	public get lightning(){return Boolean(this._flags & AbilityLayerFlag.Lightning); };
	public set lightning(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Lightning:this._flags &= ~AbilityLayerFlag.Lightning; };
	public get mayFly(){return Boolean(this._flags & AbilityLayerFlag.MayFly); };
	public set mayFly(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.MayFly:this._flags &= ~AbilityLayerFlag.MayFly; };
	public get mine(){return Boolean(this._flags & AbilityLayerFlag.Mine); };
	public set mine(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Mine:this._flags &= ~AbilityLayerFlag.Mine; };
	public get muted(){return Boolean(this._flags & AbilityLayerFlag.Muted); };
	public set muted(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Muted:this._flags &= ~AbilityLayerFlag.Muted; };
	public get noClip(){return Boolean(this._flags & AbilityLayerFlag.NoClip); };
	public set noClip(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.NoClip:this._flags &= ~AbilityLayerFlag.NoClip; };
	public get openContainers(){return Boolean(this._flags & AbilityLayerFlag.OpenContainers); };
	public set openContainers(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.OpenContainers:this._flags &= ~AbilityLayerFlag.OpenContainers; };
	public get operatorCommands(){return Boolean(this._flags & AbilityLayerFlag.OperatorCommands); };
	public set operatorCommands(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.OperatorCommands:this._flags &= ~AbilityLayerFlag.OperatorCommands; };
	public get privilegedBuilder(){return Boolean(this._flags & AbilityLayerFlag.PrivilegedBuilder); };
	public set privilegedBuilder(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.PrivilegedBuilder:this._flags &= ~AbilityLayerFlag.PrivilegedBuilder; };
	public get teleport(){return Boolean(this._flags & AbilityLayerFlag.Teleport); };
	public set teleport(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.Teleport:this._flags &= ~AbilityLayerFlag.Teleport; };
	public get walkSpeed(){return Boolean(this._flags & AbilityLayerFlag.WalkSpeed); };
	public set walkSpeed(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.WalkSpeed:this._flags &= ~AbilityLayerFlag.WalkSpeed; };
	public get worldBuilder(){return Boolean(this._flags & AbilityLayerFlag.WorldBuilder); };
	public set worldBuilder(v){ if(this.isValid()) this._player.updateMe(this); v?this._flags |= AbilityLayerFlag.WorldBuilder:this._flags &= ~AbilityLayerFlag.WorldBuilder; };
	public setAbilities(abilities: AbilityLayerFlag, enable = true){
		if(this.isValid()) this._player.updateMe(this); enable?this._flags |= abilities:this._flags &= ~abilities;
	}
	public getAbilities(){return this._flags;}
}
export class InternalAbilities extends Abilities{
	public isValid(): boolean {return this._player.isValid(); }
	public toPacket(): UpdateAbilitiesPacket { 
		const _source = new UpdateAbilitiesPacket();
		_source.commandPermissionLevel = this._commandPermissionLevel;
		_source.permissionLevel = this._permissionLevel;
		_source.entityId = this._player.id;
		const _abilityLayer = new AbilityLayer();
		_abilityLayer.type = AbilityLayerType.Base;
		_abilityLayer.flags = this._flags;
		_abilityLayer.flySpeed = this._flySpeed;
		_abilityLayer.walkSpeed = this._walkSpeed;
		_abilityLayer.allowedFlags = 524_287;
		_source.abilities = [_abilityLayer];
		return _source;
	}
	public constructor(player: InternalPlayer) {super(player);} 
}
