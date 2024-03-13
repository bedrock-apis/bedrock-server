import { KernelConstruct, KernelPrivate } from "../../kernel/base.js";
import { Type, Types } from "../base/Types.js";
import type { EntityBehavior } from "./EntityBehavior.js";

export class EntityType extends Type {
	public readonly behavior: EntityBehavior;
	public readonly componentIds: string[] = [];
	protected constructor(id: string, behavior: EntityBehavior) {
		KernelPrivate(new.target);
		super(id);
		this.behavior = behavior;
	}
}
export class EntityTypes extends Types<EntityType> {
	protected static TYPES: Map<string, EntityType> = new Map();
	public static registry(id: string, behavior: EntityBehavior) {
		const type = new (EntityType as any)(id, behavior);
		EntityTypes.TYPES.set(id, type);
		return type;
	}
}
export function ConstructEntityType(id: string, behavior: EntityBehavior): EntityType {
	return KernelConstruct(EntityType as any, id, behavior);
}
