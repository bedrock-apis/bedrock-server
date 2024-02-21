import { SerializeAs, VarLong } from "@bedrock/base";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.SetLocalPlayerAsInitialized)
export class SetLocalPlayerAsInitializedPacket extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeEntityId!: bigint;
}

