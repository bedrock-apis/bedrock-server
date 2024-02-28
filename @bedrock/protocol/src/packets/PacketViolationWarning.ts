import { SerializeAs, Bool, VarString, ZigZag, PacketId, PacketIds, ProtocolPacket } from "@bedrock/base";
import { ViolationSeverity, ViolationType } from "../types/enums/Violation.js";
import { DisconnectReason } from "../types/index.js";

@PacketId(PacketIds.PacketViolationWarning)
export class PacketViolationWarningPacket extends ProtocolPacket {
	@SerializeAs(ZigZag) public violationType!: ViolationType;
	@SerializeAs(ZigZag) public severity!: ViolationSeverity;
	@SerializeAs(ZigZag) public brokenPacketId!: number;
	@SerializeAs(VarString) public reason!: string;
}
