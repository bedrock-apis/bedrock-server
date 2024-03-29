import { Endianness, ProtocolSerializable, SerializeAs, Int16, Float, Int32, BinaryStream } from "@bedrock/base";
import { AbilityLayerType } from "../enums/Abilities.js";

export class AbilityLayer extends ProtocolSerializable {
	@SerializeAs(Int16, Endianness.Little) public type = AbilityLayerType.Base;
	@SerializeAs(Int32, Endianness.Little) public allowedFlags = 524_287;
	@SerializeAs(Int32, Endianness.Little) public flags = 0;
	@SerializeAs(Float, Endianness.Little) public flySpeed = 0.05;
	@SerializeAs(Float, Endianness.Little) public walkSpeed = 0.1;
}
