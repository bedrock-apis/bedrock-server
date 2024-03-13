import { Endianness, Float, ProtocolSerializable, SerializeAs, VarInt, ZigZag } from "@bedrock/base";

export class EntityIntProperty extends ProtocolSerializable {
	// VarInt
	@SerializeAs(VarInt) public index!: number;
	@SerializeAs(ZigZag) public value!: number;
}
export class EntityFloatProperty extends ProtocolSerializable {
	// VarInt
	@SerializeAs(VarInt) public index!: number;
	@SerializeAs(Float, Endianness.Little) public value!: number;
}
export interface EntityProperty {
	index: number;
	value: number;
}
