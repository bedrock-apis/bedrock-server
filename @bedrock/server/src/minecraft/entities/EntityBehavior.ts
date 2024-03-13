import { UpdateEntityDataPacket, AttributeComponentIds, FL32_MAX } from "@bedrock/protocol";
import type { EntityComponent, EntityComponentUpdateEvent, EntityComponentUpdateEventData } from "./BaseComponents.js";
import { ComponentMapConstructors } from "./EntityComponents.js";
import type { Entity } from "./entity.js";

export class UpdateMetadata extends UpdateEntityDataPacket {
	public readonly entity;
	// @ts-expect-error its TS stuff
	public get metadata() {
		return [...(this.entity as any)._metadatas];
	}
	public constructor(entity: Entity) {
		super();
		this.entity = entity;
		this.runtimeEntityId = entity.runtimeId;
		this.tick = 0n;
	}
}
export class EntityBehavior {
	public [AttributeComponentIds.Absorption]!: AttributeComponentLike;
	public [AttributeComponentIds.AttackDamage]!: AttributeComponentLike;

	public [AttributeComponentIds.FallDamage]!: AttributeComponentLike;
	public [AttributeComponentIds.FollowRange]!: AttributeComponentLike;

	public [AttributeComponentIds.Health]!: AttributeComponentLike;
	public [AttributeComponentIds.HorseJumpStrength]!: AttributeComponentLike;

	public [AttributeComponentIds.KnockbackResistence]!: AttributeComponentLike;

	public [AttributeComponentIds.LavaMovement]!: AttributeComponentLike;
	public [AttributeComponentIds.Luck]!: AttributeComponentLike;

	public [AttributeComponentIds.Movement]!: AttributeComponentLike;

	public [AttributeComponentIds.PlayerExhaustion]!: AttributeComponentLike;
	public [AttributeComponentIds.PlayerExperience]!: AttributeComponentLike;
	public [AttributeComponentIds.PlayerHunger]!: AttributeComponentLike;
	public [AttributeComponentIds.PlayerLevel]!: AttributeComponentLike;
	public [AttributeComponentIds.PlayerSaturation]!: AttributeComponentLike;

	public [AttributeComponentIds.UnderwaterMovement]!: AttributeComponentLike;

	public [AttributeComponentIds.ZombieSpawnReinforcements]!: AttributeComponentLike;
	public clone(): EntityBehavior {
		const copy: any = {};
		for (const componentId of Object.keys(ComponentMapConstructors)) {
			if (componentId in this) copy[componentId] = Object.setPrototypeOf({}, (this as any)[componentId] ?? null);
		}

		return Object.setPrototypeOf(copy, this);
	}
	public buildEntity(entity: Entity, components: Map<string, EntityComponent<any>>) {
		const packet = new UpdateMetadata(entity);
		let metadatas: any[] = [];
		for (const constructor of Object.values(ComponentMapConstructors)) {
			const component = new constructor(entity);
			components.set(component.componentId, component);
			if ("getMetadata" in component) {
				const currentMetadata: any[] = [];
				for (const metadata of component.getMetadata()) currentMetadata.push(metadata);
				(
					component.onUpdate as EntityComponentUpdateEvent<EntityComponentUpdateEventData<EntityComponent<string>>>
				).subscribe((e) => {
					for (const m of currentMetadata) (entity as any)._metadatas.add(m);
					entity._onUpdate(packet);
				});
				metadatas = metadatas.concat(currentMetadata);
			}
		}

		return [packet, metadatas] as [UpdateMetadata, typeof metadatas];
	}
	public constructor() {
		// eslint-disable-next-line no-constructor-return, @typescript-eslint/no-use-before-define
		return defualtBehaviors.clone();
	}
}
export const defualtBehaviors = Object.setPrototypeOf(
	{
		[AttributeComponentIds.Absorption]: { max: 16 },
		[AttributeComponentIds.AttackDamage]: { default: 1 },

		[AttributeComponentIds.FallDamage]: { default: 1 },
		[AttributeComponentIds.FollowRange]: { max: 2_048, default: 16 },

		[AttributeComponentIds.Health]: { max: 20, default: 20 },
		[AttributeComponentIds.HorseJumpStrength]: { max: 2, default: 0.7 },

		[AttributeComponentIds.KnockbackResistence]: { max: 1 },

		[AttributeComponentIds.LavaMovement]: { default: 0.02 },
		[AttributeComponentIds.Luck]: { min: -1_024, max: 1_024 },

		[AttributeComponentIds.Movement]: { max: FL32_MAX, default: 0.1 },

		[AttributeComponentIds.PlayerExhaustion]: { max: 20 },
		[AttributeComponentIds.PlayerExperience]: { max: 1 },
		[AttributeComponentIds.PlayerHunger]: { max: 20, default: 20 },
		[AttributeComponentIds.PlayerLevel]: { max: 24_791 },
		[AttributeComponentIds.PlayerSaturation]: { max: 20 },

		[AttributeComponentIds.UnderwaterMovement]: { max: FL32_MAX, default: 0.02 },
		[AttributeComponentIds.ZombieSpawnReinforcements]: { max: 1 },
	},
	EntityBehavior.prototype,
) as EntityBehavior;

export interface AttributeComponentLike {
	default?: number;
	max?: number;
	min?: number;
}
