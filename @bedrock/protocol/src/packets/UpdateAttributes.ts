import { AsList, Bool, Byte, Endianness, Float, Int16, Int32, Int64, LRootTag, SerializeAs, UUID, VarInt, VarLong, VarString, Vector2,
	Vector2f, Vector3, Vector3f, ZigZag, ZigZong , ProtocolPacket, PacketIds, PacketId, 
	Dynamic} from "@bedrock/base";
import { PlayerAttribute } from "../types/index.js";
import type { PlayerAttributeLike } from "../types/index.js";

@PacketId(PacketIds.UpdateAttributes)
export class UpdateAttributesPacket extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeEntityId!: bigint;
	@SerializeAs(PlayerAttribute) @AsList(VarInt) public attributes!: PlayerAttributeLike[];
	@SerializeAs(VarLong) public tick!: bigint;
}
