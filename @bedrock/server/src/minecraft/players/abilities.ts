/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AbilityLayer, CommandPermissionLevel, PermissionLevel, UpdateAbilitiesPacket, AbilityLayerFlag } from "@bedrock/protocol";
import { DEFUALT_PLAYER_ABILITY } from "../../types/index.js";
import type { Postable } from "../../types/postable.js";
import type { InternalPlayer } from "./player.js";

export abstract class Abilities implements Postable<UpdateAbilitiesPacket> {
	protected _source: UpdateAbilitiesPacket;
	protected _abilityLayer: AbilityLayer;
	protected _player: InternalPlayer;
	public abstract isValid(): boolean;
	protected constructor(player: InternalPlayer){
		this._source = new UpdateAbilitiesPacket();
		this._source.commandPermissionLevel = CommandPermissionLevel.Normal;
		this._source.permissionLevel = PermissionLevel.Member;
		this._source.entityId = player.id;
		this._player = player;
		this._abilityLayer = new AbilityLayer();
		this._abilityLayer.flags = DEFUALT_PLAYER_ABILITY;
		this._source.abilities = [this._abilityLayer];
	}
	public abstract toPacket(): UpdateAbilitiesPacket;
	public get commandPermissionLevel(){return this._source.commandPermissionLevel;}
	public set commandPermissionLevel(v){ if(this.isValid()) this._player.updateMe(this); this._source.commandPermissionLevel = v;}
	public get flyingSpeed(){return this._abilityLayer.flySpeed;}
	public set flyingSpeed(v){ if(this.isValid()) this._player.updateMe(this); this._abilityLayer.walkSpeed = v;}
	public get walkingSpeed(){return this._abilityLayer.flySpeed;}
	public set walkingSpeed(v){ if(this.isValid()) this._player.updateMe(this); this._abilityLayer.walkSpeed = v;}
	public get permissionLevel(){return this._source.permissionLevel;}
	public set permissionLevel(v){ if(this.isValid()) this._player.updateMe(this); this._source.permissionLevel = v;}
	public get attackMobs(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.AttackMobs); };
	public set attackMobs(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.AttackMobs:this._abilityLayer.flags &= ~AbilityLayerFlag.AttackMobs; };
	public get attackPlayers(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.AttackPlayers); };
	public set attackPlayers(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.AttackPlayers:this._abilityLayer.flags &= ~AbilityLayerFlag.AttackPlayers; };
	public get build(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Build); };
	public set build(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Build:this._abilityLayer.flags &= ~AbilityLayerFlag.Build; };
	public get count(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Count); };
	public set count(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Count:this._abilityLayer.flags &= ~AbilityLayerFlag.Count; };
	public get doorsAndSwitches(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.DoorsAndSwitches); };
	public set doorsAndSwitches(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.DoorsAndSwitches:this._abilityLayer.flags &= ~AbilityLayerFlag.DoorsAndSwitches; };
	public get flySpeed(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.FlySpeed); };
	public set flySpeed(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.FlySpeed:this._abilityLayer.flags &= ~AbilityLayerFlag.FlySpeed; };
	public get flying(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Flying); };
	public set flying(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Flying:this._abilityLayer.flags &= ~AbilityLayerFlag.Flying; };
	public get instantBuild(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.InstantBuild); };
	public set instantBuild(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.InstantBuild:this._abilityLayer.flags &= ~AbilityLayerFlag.InstantBuild; };
	public get invulnerable(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Invulnerable); };
	public set invulnerable(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Invulnerable:this._abilityLayer.flags &= ~AbilityLayerFlag.Invulnerable; };
	public get lightning(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Lightning); };
	public set lightning(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Lightning:this._abilityLayer.flags &= ~AbilityLayerFlag.Lightning; };
	public get mayFly(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.MayFly); };
	public set mayFly(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.MayFly:this._abilityLayer.flags &= ~AbilityLayerFlag.MayFly; };
	public get mine(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Mine); };
	public set mine(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Mine:this._abilityLayer.flags &= ~AbilityLayerFlag.Mine; };
	public get muted(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Muted); };
	public set muted(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Muted:this._abilityLayer.flags &= ~AbilityLayerFlag.Muted; };
	public get noClip(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.NoClip); };
	public set noClip(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.NoClip:this._abilityLayer.flags &= ~AbilityLayerFlag.NoClip; };
	public get openContainers(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.OpenContainers); };
	public set openContainers(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.OpenContainers:this._abilityLayer.flags &= ~AbilityLayerFlag.OpenContainers; };
	public get operatorCommands(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.OperatorCommands); };
	public set operatorCommands(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.OperatorCommands:this._abilityLayer.flags &= ~AbilityLayerFlag.OperatorCommands; };
	public get privilegedBuilder(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.PrivilegedBuilder); };
	public set privilegedBuilder(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.PrivilegedBuilder:this._abilityLayer.flags &= ~AbilityLayerFlag.PrivilegedBuilder; };
	public get teleport(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.Teleport); };
	public set teleport(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.Teleport:this._abilityLayer.flags &= ~AbilityLayerFlag.Teleport; };
	public get walkSpeed(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.WalkSpeed); };
	public set walkSpeed(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.WalkSpeed:this._abilityLayer.flags &= ~AbilityLayerFlag.WalkSpeed; };
	public get worldBuilder(){return Boolean(this._abilityLayer.flags & AbilityLayerFlag.WorldBuilder); };
	public set worldBuilder(v){ if(this.isValid()) this._player.updateMe(this); v?this._abilityLayer.flags |= AbilityLayerFlag.WorldBuilder:this._abilityLayer.flags &= ~AbilityLayerFlag.WorldBuilder; };
	public setAbilities(abilities: AbilityLayerFlag, enable = true){
		if(this.isValid()) this._player.updateMe(this); enable?this._abilityLayer.flags |= abilities:this._abilityLayer.flags &= ~abilities;
	}
	public getAbilities(){return this._abilityLayer.flags;}
}
export class InternalAbilities extends Abilities{
	public _isValid = false;
	public isValid(): boolean {return this._isValid; }
	public toPacket(): UpdateAbilitiesPacket { return this._source;	}
	public constructor(player: InternalPlayer) {super(player);} 
}
