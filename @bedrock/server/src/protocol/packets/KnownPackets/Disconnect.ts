import { SerializaAs, Bool, VarString, ZigZag } from "@bedrock/base";
import { DisconnectReason } from "../../../enums";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.Disconnect)
export class DisconnectPacket extends ProtocolPacket {
	@SerializaAs(ZigZag) public reason!: DisconnectReason;
	@SerializaAs(Bool) public hideDisconnectionScreen!: boolean;
	@SerializaAs(VarString) public message!: string;
}
