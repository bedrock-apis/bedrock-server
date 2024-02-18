import { Int32, SerializeAs } from "@bedrock/base";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.RequestNetworkSettings)
export class RequestNetworkSettingsPacket extends ProtocolPacket {
	@SerializeAs(Int32) public protocol!: number;
}
