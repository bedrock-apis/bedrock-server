import { Endianness, ProtocolSerializable, SerializeAs, Int16, Float, Int32 } from "@bedrock/base";
import { AbilityLayerType } from "../../../types";

export class AbilityLayer extends ProtocolSerializable {
	@SerializeAs(Int16, Endianness.Little) public type = AbilityLayerType.Base;
	@SerializeAs(Int32, Endianness.Little) public allowedFlags = 0xfffff;
	@SerializeAs(Int32, Endianness.Little) public flags = 0;
	@SerializeAs(Float, Endianness.Little) public flySpeed = 0.01;
	@SerializeAs(Float, Endianness.Little) public walkSpeed = 0.1;
}

