import type { Buffer } from "@bedrock/base";
import { Type, Types } from "../base/Types.js";

export class ItemType extends Type {
	public readonly runtimeId: number;
	public readonly componentBased: boolean;
	public constructor(id: string, runtimeId: number, componentBase = false) {
		super(id);
		this.runtimeId = runtimeId;
		this.componentBased = componentBase;
	}
}

export class ItemTypes extends Types<ItemType> {
	protected static TYPES: Map<string, ItemType> = new Map();
	protected static RTYPES: Map<number, ItemType> = new Map();
	public static getByRuntimeId(runtimeId: number) {
		return this.RTYPES.get(runtimeId);
	}
}

export function ItemDefinitionLoader(buffer: Buffer) {
	const object = JSON.parse(buffer.toString("utf8"));
	for (const itemTypeId of Object.keys(object)) {
		const { runtime_id, component_based } = object[itemTypeId];
		const itemType = new ItemType(itemTypeId, runtime_id, component_based);
		(ItemTypes as any).TYPES.set(itemTypeId, itemType);
		(ItemTypes as any).RTYPES.set(runtime_id, itemType);
	}
}
