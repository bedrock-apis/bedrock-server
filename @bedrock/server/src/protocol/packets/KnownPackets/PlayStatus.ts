import { Bool, Byte, Float, Int16, Int32, SerializaAs } from "@bedrock/base";
import { Endianness } from "@serenityjs/binarystream";
import { CompressionMethod, PlayerStatus } from "../../../enums";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.PlayStatus)
export class PlayStatus extends ProtocolPacket {
	@SerializaAs(Int32) public status!: PlayerStatus;
}
