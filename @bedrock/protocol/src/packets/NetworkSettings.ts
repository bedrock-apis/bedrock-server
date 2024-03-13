import {
	AsList,
	Bool,
	Byte,
	Endianness,
	Float,
	Int16,
	Int32,
	Int64,
	LRootTag,
	SerializeAs,
	UUID,
	VarInt,
	VarLong,
	VarString,
	Vector2,
	Vector2f,
	Vector3,
	Vector3f,
	ZigZag,
	ZigZong,
	ProtocolPacket,
	PacketIds,
	PacketId,
} from "@bedrock/base";
import { CompressionMethod } from "../types/index.js";

@PacketId(PacketIds.NetworkSettings)
export class NetworkSettingsPacket extends ProtocolPacket {
	@SerializeAs(Int16, Endianness.Little) public compressionThreshold!: number;
	@SerializeAs(Int16, Endianness.Little) public compressionMethod!: CompressionMethod;
	@SerializeAs(Bool) public clientThrottle!: boolean;
	@SerializeAs(Byte) public clientThreshold!: number;
	@SerializeAs(Float, Endianness.Little) public clientScalar!: number;
}
