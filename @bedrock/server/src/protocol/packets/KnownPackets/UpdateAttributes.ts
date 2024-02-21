import { AsList, SerializeAs, VarInt, VarLong } from "@bedrock/base";
import { PlayerAttribute } from "../../types/common/Attributes";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.UpdateAttributes)
export class UpdateAttributesPacket extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeEntityId!: bigint;
	@SerializeAs(PlayerAttribute) @AsList(VarInt) public attributes!: PlayerAttribute[];
	@SerializeAs(VarLong) public tick!: bigint;
}
