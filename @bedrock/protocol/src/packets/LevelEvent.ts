import { AsList, PacketId, PacketIds, ProtocolPacket, SerializeAs, VarInt, Vector3, Vector3f, ZigZag } from "@bedrock/base";


@PacketId(PacketIds.LevelEvent)
export class LevelEventPacket extends ProtocolPacket {
    @SerializeAs(ZigZag) public event!: number;
    @SerializeAs(Vector3f) public position!: Vector3;
    @SerializeAs(ZigZag) public data!: number; 
}
