import { SerializeAs, Int32, ProtocolPacket, PacketIds, PacketId, Endianness } from "@bedrock/base";
import { LoginToken } from "../types/index.js";

@PacketId(PacketIds.Login)
export class LoginPacket extends ProtocolPacket {
	@SerializeAs(Int32, Endianness.Big) public protocol!: number;
	@SerializeAs(LoginToken, Endianness.Little) public token!: LoginToken;
}
