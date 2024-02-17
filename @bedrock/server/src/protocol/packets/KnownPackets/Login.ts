import { SerializaAs, Int32 } from "@bedrock/base";
import { Endianness } from "@serenityjs/binarystream";
import { LoginToken } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.Login)
export class LoginPacket extends ProtocolPacket {
	@SerializaAs(Int32, Endianness.Big) public protocol!: number;
	@SerializaAs(LoginToken, Endianness.Little) public token!: LoginToken;
}
