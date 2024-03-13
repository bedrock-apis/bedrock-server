import { PublicEvent, TriggerEvent } from "../../types/events/PublicEvent.js";
import type { Entity } from "./entity.js";

export enum EntityDataKeys {
	FallDamageMultiplier = "minecraft:fall_damage.multiplier",
	Flags1 = "minecraft:metadata_flags1",
}

class EntityData {
	public readonly entity;
	public readonly handlers;
	public readonly onUpdate = new PublicEvent<[{ property: string; target: EntityDatas; value: string }]>();
	public constructor(entity: Entity) {
		this.entity = entity;
		this.handlers = {};
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			set(t, p, v) {
				if (typeof p === "string")
					TriggerEvent(t.onUpdate, { property: p, value: v, target: t as unknown as EntityDatas }).catch(console.error);
				return Reflect.set(t, p, v);
			},
		});
	}
}
export interface EntityDatas {
	[k: string]: any;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EntityDatas: new (entity: Entity) => EntityData & EntityDatas = EntityData as any;
