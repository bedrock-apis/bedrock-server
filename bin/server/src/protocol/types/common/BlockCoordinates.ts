import { ProtocolSerializable, SerializeAs, ZigZag, ZigZong } from "@bedrock/base";

export class BlockCoordinates extends ProtocolSerializable {
	@SerializeAs(ZigZag) public x: number = 0;
	@SerializeAs(ZigZong) public y: bigint = 0n;
	@SerializeAs(ZigZag) public z: number = 0;
}
