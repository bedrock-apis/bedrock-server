import { AsList, Bool, Byte, Endianness, Float, Int16, Int32, Int64, LRootTag, SerializeAs, UUID, VarInt, VarLong, VarString, Vector2,
	Vector2f, Vector3, Vector3f, ZigZag, ZigZong , ProtocolPacket, PacketIds, PacketId, 
	Dynamic} from "@bedrock/base";
import { PlayerStatus } from "../types/index.js";

@PacketId(PacketIds.PlayStatus)
export class PlayStatusPacket extends ProtocolPacket {
	@SerializeAs(Int32) public status!: PlayerStatus;
	public static From(status: PlayerStatus){
		const that = new this();
		that.status = status;
		return that;
	}
}
