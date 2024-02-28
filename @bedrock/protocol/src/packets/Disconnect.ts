import { SerializeAs, Bool, VarString, ZigZag, PacketId, PacketIds, ProtocolPacket } from "@bedrock/base";
import { DisconnectReason } from "../types/index.js";

@PacketId(PacketIds.Disconnect)
export class DisconnectPacket extends ProtocolPacket {
	@SerializeAs(ZigZag) public reason!: DisconnectReason;
	@SerializeAs(Bool) public hideDisconnectionScreen!: boolean;
	@SerializeAs(VarString) public message!: string;
}
