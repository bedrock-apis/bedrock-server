import { BedrockNBT, BinaryStream, Buffer, Int16 } from "@bedrock/base";
import type { ItemLegacyLike } from "@bedrock/protocol";
import { BlockPermutation, ItemTypes } from "../public.js";
import type { ItemType } from "./types.js";

export class CreativeItem implements ItemLegacyLike {
	public readonly type: ItemType;
	public metadata?: number = 0;
	public blockPermutation?: BlockPermutation;
	public data?: any;
	public canDestroy?: string[];
	public canPlaceOn?: string[];
	public count: number = 1;
	public constructor(type: ItemType) {
		this.type = type;
	}
	public get blockRuntimeId() { return this.blockPermutation?.runtimeId; 	}
	public get networkId() { return this.type.runtimeId; }
	public ticking?: bigint;
}
export const creativeItems: ItemLegacyLike[] = [];
export function CreativeItemDefinitionLoader(buffer: Buffer) {
	const object = JSON.parse(buffer.toString("utf8"));
	for (const { meta, name, nbt, block_states } of object) {
		if (name.includes("element") || name.includes("chemistry_table")) continue;
		const item = new CreativeItem(ItemTypes.get(name)!);
		if (block_states) {
			const stream = new BinaryStream(Buffer.from(block_states, "base64"));
			const states = BedrockNBT.ReadRootTag(stream) as any;
			const mappedState = {} as any;
			for (const a of Object.keys(states)) mappedState[a] = states[a].valueOf();
			item.blockPermutation = BlockPermutation.resolve(name, mappedState);
		}

		if (typeof meta === "number") item.metadata = meta;
		if (nbt) item.data = BedrockNBT.ReadRootTag(new BinaryStream(Buffer.from(nbt, "base64"))) as any;
		creativeItems.push(item);
	}

	const betterSword = new CreativeItem(ItemTypes.get("netherite_sword")!);
	betterSword.count = 1;
	betterSword.data = {
		display: {
			Name: "§tSuper Duper",
		},
		ench: [
			{ lvl: Int16(10), id: Int16(0) },
			{ lvl: Int16(10), id: Int16(1) },
			{ lvl: Int16(10), id: Int16(2) },
			{ lvl: Int16(10), id: Int16(3) },
			{ lvl: Int16(10), id: Int16(4) },
			{ lvl: Int16(10), id: Int16(5) },
			{ lvl: Int16(10), id: Int16(6) },
			{ lvl: Int16(10), id: Int16(7) },
			{ lvl: Int16(10), id: Int16(8) },
			{ lvl: Int16(10), id: Int16(9) },
			{ lvl: Int16(10), id: Int16(10) },
		],
	};
	// creativeItems.push(betterSword);
	 // creativeItems.push({count:2, networkId: 618});
	/* for(const c of creativeItems) {
		if(!c.data) c.data = {};
		c.data.display = {Lore:[ItemTypes.getByRuntimeId(c.networkId)?.id??"UNDEFINED"]};
	}*/
}

export class CreativeItemRegister {
	protected items = new Set<CreativeItem>();
	public groups = new Map<string, Set<CreativeItem>>();
	public registryItem(item: CreativeItem, group?: string){
		if(group) {
			const set = this.groups.get(group)??new Set();
			set.add(item);
			this.groups.set(group, set);
		}else this.items.add(item);
	}
	public unregistryItem(item: CreativeItem, group?: string){
		if(group) return this.groups.get(group)?.delete(item)??false;
		else return this.items.delete(item);
	}
}
