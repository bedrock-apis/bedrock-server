import { PacketId, PacketIds, ProtocolPacket, SerializeAs, VarInt, Vector3 } from "@bedrock/base";
import { BlockCoordinates } from "../types/index.js";

@PacketId(PacketIds.UpdateBlock)
export class UpdateBlockPacket extends ProtocolPacket {
    public static From(pos: Vector3, blockRuntimeId: number, layer?: number){
        const that = new this();
        that.position = pos;
        that.blockRuntimeId = blockRuntimeId;
        that.layer = layer??0;
        that.flags = 0;
        return that;
    }
    @SerializeAs(BlockCoordinates) public position!: Vector3;
    @SerializeAs(VarInt) public blockRuntimeId!: number;
    @SerializeAs(VarInt) public flags!: number;
    @SerializeAs(VarInt) public layer!: number;
}
