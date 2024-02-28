import { Bool, Endianness, Int16, ProtocolSerializable, SerializeAs, VarString, LRootTag, UInt16 } from "@bedrock/base";


export class BlockProperty extends ProtocolSerializable {
	@SerializeAs(VarString) public name!: string;
    @SerializeAs(LRootTag) public nbt: any = {};
}
