import type { PlayerAttributeLike} from "@bedrock/protocol";
import { AttributeComponentIds, GameMode, UpdateAttributesPacket } from "@bedrock/protocol";
import type { Client } from "../../network/Client.js";
import type { Postable } from "../../types/postable.js";
import type { Dimension } from "../dimensions/dimension.js";
import type { AttributeComponent } from "../entities/BaseComponents.js";
import type { HealthComponent } from "../entities/EntityComponents.js";
import { Entity } from "../entities/entity.js";
import { InternalAbilities, type Abilities } from "./abilities.js";
import { playerType } from "./type.js";
import { ViewManager } from "./view_manager.js";

const playerComponents = [
	AttributeComponentIds.Absorption,
	AttributeComponentIds.AttackDamage,
		
	AttributeComponentIds.FallDamage,
	AttributeComponentIds.FollowRange,
		
	AttributeComponentIds.Health,
	AttributeComponentIds.HorseJumpStrength,
		
	AttributeComponentIds.KnockbackResistence,
	AttributeComponentIds.LavaMovement,
	AttributeComponentIds.Luck,
	AttributeComponentIds.Movement,
		
	AttributeComponentIds.PlayerExhaustion,
	AttributeComponentIds.PlayerExperience,
	AttributeComponentIds.PlayerHunger,
	AttributeComponentIds.PlayerLevel,
	AttributeComponentIds.PlayerSaturation,
		
	AttributeComponentIds.UnderwaterMovement,
	AttributeComponentIds.ZombieSpawnReinforcements,
];

export class AttributeLike implements PlayerAttributeLike{
	public readonly component;
	public get current(){return this.component.currentValue;};
	public get default(){return this.component.default;};
	public get id(){return this.component.componentId;};
	public get max(){return this.component.effectiveMax;};
	public get min(){return this.component.effectiveMin;};
	public readonly modifiers = [];
	public constructor(attrComp: AttributeComponent<string>){
		this.component = attrComp;
	}
	public toString(){
		const {max, id, current, default:def, min, modifiers} = this;
		return [id, current, def, max, min, modifiers.length].join(",");
	}
}
export class PlayerAttributeUpdater extends UpdateAttributesPacket{
	public readonly player;
	public readonly changeAttributes = new Set<AttributeLike>();
	public constructor(player: InternalPlayer){
		super();
		this.player = player;
	}
	public Update(att: AttributeLike){
		this.changeAttributes.add(att);
		this.player.updates.add(this);
	}
	public toPacket(): this {
		this.runtimeEntityId = this.player.runtimeId;
		console.log(this.changeAttributes.size);
		this.attributes = [...this.changeAttributes];
		this.changeAttributes.clear();
		return this;
	}
}

export abstract class Player extends Entity{
	protected readonly _attributes = new PlayerAttributeUpdater(this as any); 
	public abstract setGameMode(gameMode: GameMode): void;
	public abstract readonly abilities: Abilities;
	public readonly client;
	public readonly name;
	public readonly gameMode = GameMode.Survival;
	public readonly updates = new Set<Postable>();
	protected constructor(dimension: Dimension, client: Client){
		super(playerType, dimension);
		this.client = client;
		this.name = client.displayName;
		for(const componentId of playerComponents){
			const component = this.getComponent(componentId);
			if(component) {
				const attLike = new AttributeLike(component as unknown as AttributeComponent<string>);
				(component as HealthComponent).onUpdate.subscribe(e=>{
					this._attributes.Update(attLike);
				});
			}
		}
	}
}
export class InternalPlayer extends Player{
	public readonly engine;
	public readonly abilities: InternalAbilities;
	public readonly viewManager = new ViewManager(this);
	public isValid(): boolean { return super.isValid() && this.engine.players.has(this); };
	public updateAll(){ this.updates.add(this.abilities); this.updates.add(this._attributes); this.postables.add(this._metadataPacket); }
	public updateMe(me: Postable){ if(this.isValid()) this.updates.add(me); }
	public constructor(dimension: Dimension, client: Client){ 
		super(dimension, client);
		this.abilities = new InternalAbilities(this);
		this.engine = this.world.engine;
	}
	public setGameMode(gameMode: GameMode){
		(this as any).gameMode = gameMode;
		// TODO:
		// Update via Gamemode Change Packet
	}
}
