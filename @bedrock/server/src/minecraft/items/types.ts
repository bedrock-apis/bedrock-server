import type { Buffer } from "@bedrock/base";
import { BinaryStream } from "@bedrock/base";
import { GameInitializePacket } from "@bedrock/protocol";
import { Type, Types } from "../base/Types.js";

export abstract class ItemType extends Type {
	public readonly runtimeId: number;
	public abstract readonly componentBased: boolean;
	public abstract readonly typeId: string;
	public constructor(id: string, runtimeId: number) {
		super(id);
		this.runtimeId = runtimeId;
	}
}

export class ItemTypes extends Types<ItemType> {
	protected static TYPES: Map<string, ItemType> = new Map();
	protected static RTYPES: Map<number, ItemType> = new Map();
	public static getByRuntimeId(runtimeId: number) {
		return this.RTYPES.get(runtimeId);
	}
}

export class InternalItemType extends ItemType {
	public readonly componentBased: boolean;
	public get typeId() {
		return this.id;
	}
	public constructor(id: string, runtimeId: number, componentBased: boolean = false) {
		super(id, runtimeId);
		this.componentBased = componentBased;
		(ItemTypes as any).TYPES.set(id, this);
		(ItemTypes as any).RTYPES.set(runtimeId, this);
	}
}

export function ItemDefinitionLoader(buffer: Buffer) {
	const str = new BinaryStream(buffer);
	str.readVarInt(); // Packet id,
	const a = GameInitializePacket.prototype.Deserialize(GameInitializePacket, str);
	for (const state of a.itemStates) new InternalItemType(state.id, state.runtimeId);
}
