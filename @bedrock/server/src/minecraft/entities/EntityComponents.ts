/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
import { AttributeComponentIds, FL32_MAX, MetadataFlags, MetadataKey, MetadataType } from "@bedrock/protocol";
import { TriggerEvent } from "../../types/index.js";
import type { MetadataComponent } from "./BaseComponents.js";
import {
	AttributeComponent,
	EntityComponent,
	EntityComponentUpdateEventData,
	FloatEntityComponent,
	FloatEntityComponentValueChangeEventData,
} from "./BaseComponents.js";
import { EntityDataKeys } from "./EntityData.js";
import type { Entity } from "./entity.js";

export enum EntityComponentId {
	Absorption = AttributeComponentIds.Absorption,
	AttackDamage = AttributeComponentIds.AttackDamage,

	FallDamage = AttributeComponentIds.FallDamage,
	FollowRange = AttributeComponentIds.FollowRange,

	Health = AttributeComponentIds.Health,
	HorseJumpStrength = AttributeComponentIds.HorseJumpStrength,

	KnockbackResistence = AttributeComponentIds.KnockbackResistence,

	LavaMovement = AttributeComponentIds.LavaMovement,
	Luck = AttributeComponentIds.Luck,

	Movement = AttributeComponentIds.Movement,

	PlayerExhaustion = AttributeComponentIds.PlayerExhaustion,
	PlayerExperience = AttributeComponentIds.PlayerExperience,
	PlayerHunger = AttributeComponentIds.PlayerHunger,
	PlayerLevel = AttributeComponentIds.PlayerLevel,
	PlayerSaturation = AttributeComponentIds.PlayerSaturation,

	UnderwaterMovement = AttributeComponentIds.UnderwaterMovement,
	ZombieSpawnReinforcements = AttributeComponentIds.ZombieSpawnReinforcements,

	StatusProperties = "minecraft:entity_status",
	Scale = "minecraft:scale",
}

export class ScaleComponent extends FloatEntityComponent<EntityComponentId.Scale> implements MetadataComponent {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.Scale);
	}
	public *getMetadata() {
		const data = this.entity.entityData;
		const componentId = this.componentId;
		yield {
			key: MetadataKey.Scale,
			type: MetadataType.Float,
			get value() {
				return data[componentId + ".value"] ?? 1;
			},
		};
	}
}

export class AbsorptionComponent extends AttributeComponent<EntityComponentId.Absorption> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.Absorption);
	}
}
export class AttackDamageComponent
	extends AttributeComponent<EntityComponentId.AttackDamage>
	implements MetadataComponent
{
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.AttackDamage);
	}
	public *getMetadata() {
		const data = this.entity.entityData;
		const componentId = this.componentId;
		yield {
			key: MetadataKey.Strength,
			type: MetadataType.Float,
			get value() {
				return data[componentId + ".value"] ?? 1;
			},
		};
		yield {
			key: MetadataKey.MaxStrength,
			type: MetadataType.Float,
			get value() {
				return data[componentId + ".max"] ?? FL32_MAX;
			},
		};
	}
}

export class FallDamageComponent extends AttributeComponent<EntityComponentId.FallDamage> implements MetadataComponent {
	public get multipliter(): number {
		return this.entity.entityData[EntityDataKeys.FallDamageMultiplier] ?? 1;
	}
	public set multipliter(v) {
		const data = new FloatEntityComponentValueChangeEventData(
			this,
			this.entity.entityData[EntityDataKeys.FallDamageMultiplier],
			v,
		);
		TriggerEvent(this.onUpdate, new EntityComponentUpdateEventData(this)).catch(console.error);
		this.entity.entityData[EntityDataKeys.FallDamageMultiplier] = data.newValue;
	}
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.FallDamage);
	}
	public *getMetadata() {
		const data = this.entity.entityData;
		yield {
			key: MetadataKey.FallDamageMultiplier,
			type: MetadataType.Float,
			get value() {
				return data[EntityDataKeys.FallDamageMultiplier] ?? 1;
			},
		};
	}
}
export class FollowRangeComponent extends AttributeComponent<EntityComponentId.FollowRange> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.FollowRange);
	}
}

export class HorseJumpStrengthComponent extends AttributeComponent<EntityComponentId.HorseJumpStrength> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.HorseJumpStrength);
	}
}
export class HealthComponent extends AttributeComponent<EntityComponentId.Health> implements MetadataComponent {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.Health);
	}
	public *getMetadata() {
		const data = this.entity.entityData;
		const componentId = this.componentId;
		yield {
			key: MetadataKey.Health,
			type: MetadataType.Float,
			get value() {
				return data[componentId + ".value"] ?? 20;
			},
		};
	}
}

export class KnockbackResistenceComponent extends AttributeComponent<EntityComponentId.KnockbackResistence> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.KnockbackResistence);
	}
}

export class LavaMovementComponent extends AttributeComponent<EntityComponentId.LavaMovement> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.LavaMovement);
	}
}
export class LuckComponent extends AttributeComponent<EntityComponentId.Luck> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.Luck);
	}
}

export class MovementComponent extends AttributeComponent<EntityComponentId.Movement> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.Movement);
	}
}

export class PlayerExhaustionComponent extends AttributeComponent<EntityComponentId.PlayerExhaustion> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.PlayerExhaustion);
	}
}
export class PlayerExperienceComponent extends AttributeComponent<EntityComponentId.PlayerExperience> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.PlayerExperience);
	}
}
export class PlayerHungerComponent extends AttributeComponent<EntityComponentId.PlayerHunger> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.PlayerHunger);
	}
}
export class PlayerLevelComponent extends AttributeComponent<EntityComponentId.PlayerLevel> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.PlayerLevel);
	}
}
export class PlayerSaturationComponent extends AttributeComponent<EntityComponentId.PlayerSaturation> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.PlayerSaturation);
	}
}

export class UnderwaterMovementComponent extends AttributeComponent<EntityComponentId.UnderwaterMovement> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.UnderwaterMovement);
	}
}
export class ZombieSpawnReinforcementsComponent extends AttributeComponent<EntityComponentId.ZombieSpawnReinforcements> {
	public constructor(entity: Entity) {
		super(entity, EntityComponentId.ZombieSpawnReinforcements);
	}
}

class StatusPropertiesComponentPrivate extends EntityComponent<"minecraft:entity_status"> {
	public get currentValue(): bigint {
		return this.entity.entityData[this.componentId + ".value"] ?? 0n;
	}
	public set currentValue(v) {
		TriggerEvent(this.onUpdate, new EntityComponentUpdateEventData(this)).catch(console.error);
		this.entity.entityData[this.componentId + ".value"] = v;
	}
	public constructor(entity: Entity) {
		super(entity, "minecraft:entity_status");
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			has(target, p) {
				return (
					Object.hasOwn(MetadataFlags, typeof p === "string" && p.startsWith("is") ? p.slice(2) : p) ||
					Reflect.has(target, p)
				);
			},
			ownKeys(target) {
				return [...Object.getOwnPropertyNames(MetadataFlags).map((e) => "is" + e), ...Reflect.ownKeys(target)];
			},
			get(t, p) {
				const pp = typeof p === "string" && p.startsWith("is") ? p.slice(2) : p;
				if (Object.hasOwn(MetadataFlags, pp)) return Boolean(t.currentValue & MetadataFlags[pp as "AffectedByGravity"]);
				else return Reflect.get(t, p);
			},
			set(t, p, v) {
				const pp = typeof p === "string" && p.startsWith("is") ? p.slice(2) : p;
				if (Object.hasOwn(MetadataFlags, pp)) {
					t.currentValue = v
						? t.currentValue | MetadataFlags[pp as "AffectedByGravity"]
						: t.currentValue & ~MetadataFlags[pp as "AffectedByGravity"];
					return true;
				} else return Reflect.set(t, p, v);
			},
		}) as any;
	}
	public *getMetadata() {
		const data = this.entity.entityData;
		const componentId = this.componentId;
		yield {
			key: MetadataKey.Flags,
			type: MetadataType.Long,
			get value() {
				return data[componentId + ".value"] ?? 0;
			},
		};
	}
}

export type StatusPropertiesComponent = StatusPropertiesComponentPrivate & {
	[k in `is${keyof typeof MetadataFlags}`]: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StatusPropertiesComponent: new () => StatusPropertiesComponent & StatusPropertiesComponentPrivate =
	StatusPropertiesComponentPrivate as unknown as any;

export const ComponentMapConstructors = {
	[EntityComponentId.Absorption]: AbsorptionComponent,
	[EntityComponentId.AttackDamage]: AttackDamageComponent,
	[EntityComponentId.FallDamage]: FallDamageComponent,
	[EntityComponentId.FollowRange]: FollowRangeComponent,
	[EntityComponentId.HorseJumpStrength]: HorseJumpStrengthComponent,
	[EntityComponentId.Health]: HealthComponent,
	[EntityComponentId.KnockbackResistence]: KnockbackResistenceComponent,
	[EntityComponentId.LavaMovement]: LavaMovementComponent,
	[EntityComponentId.Luck]: LuckComponent,
	[EntityComponentId.Movement]: MovementComponent,
	[EntityComponentId.PlayerExhaustion]: PlayerExhaustionComponent,
	[EntityComponentId.PlayerExperience]: PlayerExperienceComponent,
	[EntityComponentId.PlayerHunger]: PlayerHungerComponent,
	[EntityComponentId.PlayerLevel]: PlayerLevelComponent,
	[EntityComponentId.PlayerSaturation]: PlayerSaturationComponent,
	[EntityComponentId.UnderwaterMovement]: UnderwaterMovementComponent,
	[EntityComponentId.ZombieSpawnReinforcements]: ZombieSpawnReinforcementsComponent,

	[EntityComponentId.Scale]: ScaleComponent,
	[EntityComponentId.StatusProperties]: StatusPropertiesComponent,
};
export type ComponentMapInstances = {
	[k in keyof typeof ComponentMapConstructors]: InstanceType<(typeof ComponentMapConstructors)[k]>;
};
