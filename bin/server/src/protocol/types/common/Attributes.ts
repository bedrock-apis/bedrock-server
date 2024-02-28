import { AsList, Bool, Endianness, Float, Int32, ProtocolSerializable, SerializeAs, VarInt, VarString } from "@bedrock/base";
import { FL32_MAX } from "../../../types";

export class PlayerAttributeModifier extends ProtocolSerializable{ // VarInt
    @SerializeAs(VarString) public id!: string;
    @SerializeAs(VarString) public name!: string;
    @SerializeAs(Int32, Endianness.Little) public amount: number = 0;
    @SerializeAs(Int32, Endianness.Little) public operation: number = 0;
    @SerializeAs(Float, Endianness.Little) public operand: number = 1;
    @SerializeAs(Bool, Endianness.Little) public serializable!: boolean;
}
export class PlayerAttribute extends ProtocolSerializable { // VarInt
    @SerializeAs(Float, Endianness.Little) public min = 0;
    @SerializeAs(Float, Endianness.Little) public max = FL32_MAX;
    @SerializeAs(Float, Endianness.Little) public current = 0;
    @SerializeAs(Float, Endianness.Little) public defualt = 0;
    @SerializeAs(VarString) public id = "";
    @SerializeAs(PlayerAttributeModifier) @AsList(VarInt) public modifiers = [];
}
