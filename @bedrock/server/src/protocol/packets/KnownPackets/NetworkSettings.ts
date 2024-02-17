import { Bool, Byte, Float, Int16, SerializaAs } from "@bedrock/base";
import { Endianness } from "@serenityjs/binarystream";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.NetworkSettings)
export class NetworkSettingsPacket extends ProtocolPacket {
	@SerializaAs(Int16, Endianness.Little) public compressionThreshold!: number;
	@SerializaAs(Int16, Endianness.Little) public compressionMethod!: number;
	@SerializaAs(Bool) public clientThrottle!: boolean;
	@SerializaAs(Byte) public clientThreshold!: number;
	@SerializaAs(Float, Endianness.Little) public clientScalar!: number;
}
