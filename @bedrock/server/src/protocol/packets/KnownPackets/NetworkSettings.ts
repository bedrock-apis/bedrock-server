import { Bool, Byte, Float, Int16, SerializeAs } from "@bedrock/base";
import { Endianness } from "@serenityjs/binarystream";
import { CompressionMethod } from "../../../types/enums";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.NetworkSettings)
export class NetworkSettingsPacket extends ProtocolPacket {
	@SerializeAs(Int16, Endianness.Little) public compressionThreshold!: number;
	@SerializeAs(Int16, Endianness.Little) public compressionMethod!: CompressionMethod;
	@SerializeAs(Bool) public clientThrottle!: boolean;
	@SerializeAs(Byte) public clientThreshold!: number;
	@SerializeAs(Float, Endianness.Little) public clientScalar!: number;
}
