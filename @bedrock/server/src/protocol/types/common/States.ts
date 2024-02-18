import { Bool, Endianness, Int16, ProtocolSerializable, SerializeAs, VarString, LRootTag } from "@bedrock/base";

export class ItemState extends ProtocolSerializable { // VarInt
    @SerializeAs(VarString)	public name!: string;
    @SerializeAs(Int16, Endianness.Little)	public runtimeId!: string;
    @SerializeAs(Bool)	public componentBased!: number;
}

export class BlockProperty extends ProtocolSerializable {
	@SerializeAs(VarString) public name!: string;
    @SerializeAs(LRootTag) public nbt: any = {};
}
