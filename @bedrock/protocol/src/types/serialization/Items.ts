import type { Constructor } from "@bedrock/base";
import {
	BedrockNBT,
	Endianness,
	ProtocolType,
	BinaryStream,
	NewSerializable,
	ProtocolSerializable,
	VarString,
	Int16,
	SerializeAs,
	BRootTag,
	LRootTag,
} from "@bedrock/base";
import { SpecialVariables } from "../constants/SpecialVariables.js";

export interface ItemLegacyEntryLike{
	entryId: number,
	item: ItemLegacyLike
}
export interface ItemLegacyLike {
	blockRuntimeId?: number;
	canDestroy?: string[];
	canPlaceOn?: string[];
	count?: number;
	data?: any;
	metadata?: number;
	networkId: number;
	ticking?: bigint;
}
export class ItemLegacy extends ProtocolType {
	public static From(networkId: number, count?: number, metadata?: number, blockRuntimeId?: number) {
		const that = new this();
		that.networkId = networkId;
		that.count = count ?? 1;
		that.metadata = metadata;
		that.blockRuntimeId = blockRuntimeId;
	}
	public setCanPlaceOn(blocks: string[]) {
		this.canPlaceOn = blocks;
		return this;
	}
	public setCanDestroy(blocks: string[]) {
		this.canDestroy = blocks;
		return this;
	}
	public blockRuntimeId?: number;
	public count: number = 1;
	public metadata?: number;
	public networkId: number = 0;
	public ticking?: bigint;
	public canDestroy: string[] = [];
	public canPlaceOn: string[] = [];
	public data?: any;
	public Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();

		const networkId = stream.readZigZag();
		if (networkId === 0) return thats; // air

		// Read the rest of the value.
		thats.count = stream.readUint16(Endianness.Little);
		thats.metadata = stream.readVarInt();
		thats.blockRuntimeId = stream.readZigZag();

		const extrasLength = stream.readVarInt(); // useLess but in need

		if (stream.readUint16(Endianness.Little) === 0xffff) {
			const version = stream.readByte(); // unknown prefix 0x01 is used, when zero maybe its version of NBT
			if (version) thats.data = BedrockNBT.ReadRootTag(stream);
		}

		const canPlaceStrings: string[] = [];
		for (let i = 0; i < stream.readInt32(Endianness.Little); i++)
			canPlaceStrings.push(stream.readString32(Endianness.Little));
		thats.canPlaceOn = canPlaceStrings;

		const canDestroyStrings: string[] = [];
		for (let i = 0; i < stream.readInt32(Endianness.Little); i++)
			canDestroyStrings.push(stream.readString32(Endianness.Little));
		thats.canDestroy = canDestroyStrings;

		if (networkId === SpecialVariables.shieldItemId) {
			thats.ticking = stream.readInt64(Endianness.Little);
		}

		return Object.setPrototypeOf(thats, that.prototype);
	}
	public Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		// eslint-disable-next-line no-param-reassign
		value = value ?? {};
		stream.writeZigZag(value.networkId ?? 0);
		// If the item is air, we continue
		if ((value.networkId ?? 0) === 0) return;
		stream.writeUint16(value.count ?? 1, Endianness.Little);
		stream.writeVarInt(value.metadata ?? 0);
		stream.writeZigZag(value.blockRuntimeId ?? 0);

		// Nbt data
		const extras = new BinaryStream();
		const hasNbt = typeof value.data === "object";
		extras.writeUint16(hasNbt ? 0xffff : 0x0000, Endianness.Little);
		if (hasNbt) {
			extras.writeByte(0x01); // version
			BedrockNBT.WriteRootTag(extras, value.data);
		}

		// CanPlaceOn data
		extras.writeInt32(value.canPlaceOn?.length ?? 0, Endianness.Little);
		for (const string of value.canPlaceOn ?? []) extras.writeString32(string, Endianness.Little);

		// CanDestroy data
		extras.writeInt32(value.canDestroy?.length ?? 0, Endianness.Little);
		for (const string of value.canDestroy ?? []) extras.writeString32(string, Endianness.Little);

		// Check if item is "minecraft:	"
		if (value.networkId === SpecialVariables.shieldItemId) {
			// I believe minecraft:shield is the only item that has this? -> PMK7.. from serenity
			extras.writeInt64(0n, Endianness.Little);
		}

		// Calculate length of data, and write it
		const buff = extras.getBuffer();
		const len = buff.byteLength;
		stream.writeVarInt(len);
		stream.writeBuffer(buff);
	}
}
export const ItemEntries = NewSerializable(
	(stream, value: ItemLegacyEntryLike[]) => {
		stream.writeVarInt(value?.length ?? 0);
		for (const v of value ?? []) {
			stream.writeVarInt(v.entryId); // entryId
			ItemLegacy.prototype.Serialize(ItemLegacy, stream, v.item as ItemLegacy);
		}
	},
	(str) => {
		const arr = [] as ItemLegacyEntryLike[];
		const length = str.readVarInt();
		for (let i = 0; i < length; i++) {
			const entryId = str.readVarInt();
			arr.push({entryId,item:ItemLegacy.prototype.Deserialize(ItemLegacy, str)});
		}

		return arr;
	},
);

export class ItemState extends ProtocolSerializable {
	// VarInt
	@SerializeAs(VarString) public id!: string;
	@SerializeAs(Int16, Endianness.Little) public runtimeId!: number;
	@SerializeAs(Boolean) public componentBased!: number;
}
export class ItemComponent extends ProtocolSerializable {
	// VarInt
	@SerializeAs(VarString) public name!: string;
	@SerializeAs(LRootTag) public data!: any;
}
export interface ItemComponentLike {
	data: any;
	typeId: string;
}
export interface ItemStateLike {
	componentBase?: boolean;
	id: string;
	runtimeId: number;
}
export interface ItemStackLike{
	blockRuntimeId?: number;
	canDestroy?: string[];
	canPlaceOn?: string[];
	count?: number;
	data?: any;
	metadata?: number;
	networkId: number;
	stackId?: number;
	ticking?: bigint;
}
export class ItemStack extends ProtocolType {
	public static From(networkId: number, count?: number, metadata?: number, blockRuntimeId?: number, stackId?: number) {
		const that = new this();
		that.networkId = networkId;
		that.stackId = 0;
		that.count = count ?? 1;
		that.metadata = metadata;
		that.blockRuntimeId = blockRuntimeId;
	}
	public setCanPlaceOn(blocks: string[]) {
		this.canPlaceOn = blocks;
		return this;
	}
	public setCanDestroy(blocks: string[]) {
		this.canDestroy = blocks;
		return this;
	}
	public blockRuntimeId?: number;
	public stackId?: number;
	public count: number = 1;
	public metadata?: number;
	public networkId: number = 0;
	public ticking?: bigint;
	public canDestroy: string[] = [];
	public canPlaceOn: string[] = [];
	public data?: any;
	public Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();

		const networkId = stream.readZigZag();
		if (networkId === 0) return thats; // air

		// Read the rest of the value.
		thats.count = stream.readUint16(Endianness.Little);
		thats.metadata = stream.readVarInt();
		
		if(stream.readBool()) thats.stackId = stream.readZigZag();
		
		thats.blockRuntimeId = stream.readZigZag();

		const extrasLength = stream.readVarInt(); // useLess but in need

		if (stream.readUint16(Endianness.Little) === 0xffff) {
			const version = stream.readByte(); // unknown prefix 0x01 is used, when zero maybe its version of NBT
			if (version) thats.data = BedrockNBT.ReadRootTag(stream);
		}

		const canPlaceStrings: string[] = [];
		for (let i = 0; i < stream.readInt32(Endianness.Little); i++)
			canPlaceStrings.push(stream.readString32(Endianness.Little));
		thats.canPlaceOn = canPlaceStrings;

		const canDestroyStrings: string[] = [];
		for (let i = 0; i < stream.readInt32(Endianness.Little); i++)
			canDestroyStrings.push(stream.readString32(Endianness.Little));
		thats.canDestroy = canDestroyStrings;

		if (networkId === 357) {
			thats.ticking = stream.readInt64(Endianness.Little);
		}

		return Object.setPrototypeOf(thats, that.prototype);
	}
	public Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		// eslint-disable-next-line no-param-reassign
		value = value ?? {};
		stream.writeZigZag(value.networkId ?? 0);
		// If the item is air, we continue
		if ((value.networkId ?? 0) === 0) return;
		stream.writeUint16(value.count ?? 1, Endianness.Little);
		stream.writeVarInt(value.metadata ?? 0);
		if(typeof value.stackId === "number") {
			stream.writeBool(true);
			stream.writeZigZag(value.stackId);
		}

		stream.writeZigZag(value.blockRuntimeId ?? 0);

		// Nbt data
		const extras = new BinaryStream();
		const hasNbt = typeof value.data === "object";
		extras.writeUint16(hasNbt ? 0xffff : 0x0000, Endianness.Little);
		if (hasNbt) {
			extras.writeByte(0x01); // version
			BedrockNBT.WriteRootTag(extras, value.data);
		}

		// CanPlaceOn data
		extras.writeInt32(value.canPlaceOn?.length ?? 0, Endianness.Little);
		for (const string of value.canPlaceOn ?? []) extras.writeString32(string, Endianness.Little);

		// CanDestroy data
		extras.writeInt32(value.canDestroy?.length ?? 0, Endianness.Little);
		for (const string of value.canDestroy ?? []) extras.writeString32(string, Endianness.Little);

		// Check if item is "minecraft:	"
		if (value.networkId  === SpecialVariables.shieldItemId) {
			// I believe minecraft:shield is the only item that has this? -> PMK7.. from serenity
			extras.writeInt64(value.ticking??0n, Endianness.Little);
		}

		// Calculate length of data, and write it
		const buff = extras.getBuffer();
		const len = buff.byteLength;
		stream.writeVarInt(len);
		stream.writeBuffer(buff);
	}
}
