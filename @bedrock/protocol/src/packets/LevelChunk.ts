import {
	AsList,
	Condition,
	Endianness,
	PacketId,
	PacketIds,
	ProtocolPacket,
	Buffer,
	SerializeAs,
	UInt16,
	UInt64,
	VarBuffer,
	VarInt,
	ZigZag,
} from "@bedrock/base";
import { ChunkCoordinates, Vector2Chunk } from "../types/index.js";

@PacketId(PacketIds.LevelChunk)
export class LevelChunkPacket extends ProtocolPacket {
	@SerializeAs(ChunkCoordinates) public position!: Vector2Chunk;
	@SerializeAs(ZigZag) public dimension!: number;
	@SerializeAs(VarInt) public subChunkCount!: number;
	@SerializeAs(UInt16, Endianness.Little)
	@Condition((t) => t.subChunkCount === -2)
	public highest_subchunk_count?: number;
	@SerializeAs(Boolean) public cacheEnabled!: boolean;
	@SerializeAs(UInt64, Endianness.Little)
	@AsList(VarInt)
	@Condition((t) => t.cacheEnabled)
	public blobs?: BigUint64Array;
	@SerializeAs(VarBuffer) public payload!: Buffer;
}
