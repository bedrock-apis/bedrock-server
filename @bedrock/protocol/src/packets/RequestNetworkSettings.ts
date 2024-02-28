import { AsList, Bool, Byte, Endianness, Float, Int16, Int32, Int64, LRootTag, SerializeAs, UUID, VarInt, VarLong, VarString, Vector2,
	Vector2f, Vector3, Vector3f, ZigZag, ZigZong , ProtocolPacket, PacketIds, PacketId, 
	Dynamic} from "@bedrock/base";

@PacketId(PacketIds.RequestNetworkSettings)
export class RequestNetworkSettingsPacket extends ProtocolPacket {
	@SerializeAs(Int32) public protocol!: number;
}
