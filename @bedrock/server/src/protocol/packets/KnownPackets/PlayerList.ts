import { Byte, SerializeAs } from "@bedrock/base";
import { RecordAction } from "../../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.PlayerList)
export class PlayerListPacket extends ProtocolPacket {
	@SerializeAs(Byte) public action = RecordAction.Add;
	// @SerializeAs(Records, Endianness.Little, "action") public records!: Record[];
}
