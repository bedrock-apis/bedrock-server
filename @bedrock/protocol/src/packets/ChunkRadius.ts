import {
	AsList,
	Byte,
	Condition,
	Endianness,
	PacketId,
	PacketIds,
	ProtocolPacket,
	SByte,
	SerializeAs,
	UInt16,
	UInt32,
	VarInt,
	VarLong,
	Vector3,
	Vector3f,
	ZigZag,
	ZigZong,
} from "@bedrock/base";
import type { ItemLegacyLike, Vector2Chunk } from "../types/index.js";
import {
	ItemEntries,
	InteractActions,
	BlockCoordinates,
	WindowsIds,
	WindowsTypes,
	ChunkCoordinates,
} from "../types/index.js";

@PacketId(PacketIds.RequestChunkRadius)
export class RequestChunkRadiusPacket extends ProtocolPacket {
	@SerializeAs(ZigZag) public chunkRadius!: number;
	@SerializeAs(Byte) public maxRadius!: number;
}

@PacketId(PacketIds.ChunkRadiusUpdate)
export class ChunkRadiusUpdatePacket extends ProtocolPacket {
	@SerializeAs(ZigZag) public chunkRadius!: number;
}

@PacketId(PacketIds.NetworkChunkPublisherUpdate)
export class NetworkChunkPublisherUpdatePacket extends ProtocolPacket {
	@SerializeAs(BlockCoordinates) public sourcePoint!: Vector3;
	@SerializeAs(VarInt) public blockRadius!: number;
	@SerializeAs(ChunkCoordinates) @AsList(UInt32, Endianness.Little) public chunkCoords!: Vector2Chunk[];
}
