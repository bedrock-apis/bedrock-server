import { SerializeAs, Bool, VarString, ZigZag } from "@bedrock/base";
import { DisconnectReason } from "../../../enums";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.Disconnect)
export class DisconnectPacket extends ProtocolPacket {
	@SerializeAs(ZigZag) public reason!: DisconnectReason;
	@SerializeAs(Bool) public hideDisconnectionScreen!: boolean;
	@SerializeAs(VarString) public message!: string;
}
