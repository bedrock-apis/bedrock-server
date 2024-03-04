import { Endianness, Int64, PacketId, PacketIds, ProtocolPacket, SerializeAs } from "@bedrock/base";

@PacketId(PacketIds.TickSync)
export class TickSyncPacket extends ProtocolPacket {
	@SerializeAs(Int64, Endianness.Little) public requestTime: bigint = 0n;
	@SerializeAs(Int64, Endianness.Little) public responseTime!: bigint;
}
