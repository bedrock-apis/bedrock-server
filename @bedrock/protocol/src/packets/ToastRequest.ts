import { Endianness, Int64, PacketId, PacketIds, ProtocolPacket, SerializeAs, VarString } from "@bedrock/base";

@PacketId(PacketIds.ToastRequest)
export class ToastRequestPacket extends ProtocolPacket {
    @SerializeAs(VarString) public title: string = "<title>";
    @SerializeAs(VarString) public message: string = "<message>";
}
