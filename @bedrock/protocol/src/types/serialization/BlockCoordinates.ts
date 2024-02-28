import { ProtocolSerializable, SerializeAs, VarInt, ZigZag, ZigZong } from "@bedrock/base";

export class BlockCoordinates extends ProtocolSerializable {
	@SerializeAs(ZigZag) public x: number = 0;
	@SerializeAs(VarInt) public y: number = 0;
	@SerializeAs(ZigZag) public z: number = 0;
}

export class ChunkCoordinates extends ProtocolSerializable {
	@SerializeAs(ZigZag) public x: number = 0;
	@SerializeAs(ZigZag) public z: number = 0;
}
export interface Vector2Chunk {
	x: number;
	z: number;
}
