import type { Constructor} from "@bedrock/base";
import { BedrockNBT, Endianness, ProtocolSerializable, ProtocolType, SerializeAs, VarInt , BinaryStream} from "@bedrock/base";

export class ItemStack extends ProtocolType {
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
			if(version) thats.data = BedrockNBT.ReadRootTag(stream);
		}

		const canPlaceStrings: string[] = [];
		for (let i = 0; i < stream.readInt32(Endianness.Little); i++) canPlaceStrings.push(stream.readString32(Endianness.Little));
		thats.canPlaceOn = canPlaceStrings;
        
		const canDestroyStrings: string[] = [];
		for (let i = 0; i < stream.readInt32(Endianness.Little); i++) canDestroyStrings.push(stream.readString32(Endianness.Little));
		thats.canDestroy = canDestroyStrings;
        
		if (networkId === 357) {
			thats.ticking = stream.readInt64(Endianness.Little);
		}

		return Object.setPrototypeOf(thats, that.prototype);
	}
	public Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		// eslint-disable-next-line no-param-reassign
		value = value??{};
		stream.writeZigZag(value.networkId??0);
		// If the item is air, we continue
		if ((value.networkId??0) === 0) return;
		stream.writeUint16(value.count??1, Endianness.Little);
		stream.writeVarInt(value.metadata??0);
		stream.writeZigZag(value.blockRuntimeId??0);

		// Nbt data
		const extras = new BinaryStream();
		const hasNbt = typeof value.data === "object";
		extras.writeUint16(hasNbt?0xffff:0x0000, Endianness.Little);
		if (hasNbt) {
			extras.writeByte(0x01); // version
			BedrockNBT.WriteRootTag(extras, value.data);
		}

		// CanPlaceOn data
		extras.writeInt32(value.canPlaceOn?.length??0, Endianness.Little);
		for (const string of value.canPlaceOn) extras.writeString32(string, Endianness.Little);

		// CanDestroy data
		extras.writeInt32(value.canDestroy?.length??0, Endianness.Little);
		for (const string of value.canDestroy) extras.writeString32(string, Endianness.Little);

		// Check if item is "minecraft:shield"
		if (value.networkId === 357) {
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
export class ItemEntries extends ProtocolType {
	public itemStacks: ItemStack[] = [];
	public Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		stream.writeVarInt(value.itemStacks?.length??0);
		let i = 1;
		for (const itemStack of value.itemStacks) {
			stream.writeVarInt(i++); // entryId
			ItemStack.prototype.Serialize(ItemStack, stream, itemStack);
		}
	}
	public Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		const arr = thats.itemStacks;
		const length = stream.readVarInt();
		for (let i = 0; i < length; i++) {
			const entryId = stream.readVarInt();
			arr.push(ItemStack.prototype.Deserialize(ItemStack, stream));
		}

		return thats;
	}
}
