import { Bool, Byte, Float, Int16, Int32, SerializeAs } from "@bedrock/base";
import { Endianness } from "@serenityjs/binarystream";
import { CompressionMethod, PlayerStatus } from "../../../types/enums";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.PlayStatus)
export class PlayStatus extends ProtocolPacket {
	@SerializeAs(Int32) public status!: PlayerStatus;
}
