import { Int32, SerializaAs } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.RequestNetworkSettings)
export class RequestNetworkSettingsPacket extends ProtocolPacket {
	@SerializaAs(Int32) public protocol!: number;
}
