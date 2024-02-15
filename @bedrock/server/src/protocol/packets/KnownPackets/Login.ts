import { Endianness } from "@serenityjs/binarystream";
import { LoginToken, Int32, SerializaAs } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.Login)
export class LoginPacket extends ProtocolPacket {
	@SerializaAs(Int32, Endianness.Little) public protocol!: number;
	@SerializaAs(LoginToken, Endianness.Little) public token!: LoginToken;
}
