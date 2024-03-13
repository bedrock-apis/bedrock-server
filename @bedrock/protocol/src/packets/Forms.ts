import { Byte, Condition, Endianness, Int64, PacketId, PacketIds, ProtocolPacket, SerializeAs, VarInt, VarString } from "@bedrock/base";

@PacketId(PacketIds.ModalFormRequest)
export class ModalFormRequestPacket extends ProtocolPacket {
    @SerializeAs(VarInt) public formId: number = 0;
    @SerializeAs(VarString) public jsonPayload: string = JSON.stringify({});
}

@PacketId(PacketIds.ModalFormResponse)
export class ModalFormResponsePacket extends ProtocolPacket {
    @SerializeAs(VarInt) public formId: number = 0;
    @SerializeAs(Boolean) public hasResponseData: boolean = false;
    @SerializeAs(VarString) @Condition(e=>e.hasResponseData) public jsonPayload?: string;
    @SerializeAs(Boolean) public hasCancelationReason: boolean = false;
    @SerializeAs(Byte) @Condition(e=>e.hasCancelationReason) public cancelationReason?: number;
}
