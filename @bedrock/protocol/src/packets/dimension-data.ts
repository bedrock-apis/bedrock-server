import { SerializeAs, VarString, ZigZag, PacketId, PacketIds, ProtocolPacket, ProtocolSerializable, AsList, VarInt } from "@bedrock/base";

export class DimensionDefinition extends ProtocolSerializable{
    @SerializeAs(VarString) public id!: string;
    @SerializeAs(ZigZag) public maxHeight!: number;
    @SerializeAs(ZigZag) public minHeight!: number;
    @SerializeAs(ZigZag) public generator: number = 5;
}
export interface DimensionDefinitionLike{
    generator: number;
    id: string;
    maxHeight: number;
    minHeight: number;
}

@PacketId(PacketIds.DimensionData)
export class DimensionDataPacket extends ProtocolPacket {
	@SerializeAs(DimensionDefinition) @AsList(VarInt) public definitions!: DimensionDefinitionLike[];
}
