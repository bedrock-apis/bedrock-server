import { Endianness } from "@serenityjs/binarystream";
import { DisconnectReason } from "../../../enums";
import { LoginToken, Int32, SerializaAs, Bool, VarString, ZigZag } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.Disconnect)
export class DisconnectPacket extends ProtocolPacket {
	@SerializaAs(ZigZag) public reason!: DisconnectReason;
	@SerializaAs(Bool) public hideDisconnectionScreen!: boolean;
	@SerializaAs(VarString) public message!: string;
}
