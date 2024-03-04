import { AsList, Bool, Byte, Endianness, Float, Int16, Int32, Int64, LRootTag, SerializeAs, UUID, VarInt, VarLong, VarString, Vector2,
	Vector2f, Vector3, Vector3f, ZigZag, ZigZong , ProtocolPacket, PacketIds, PacketId, 
	Dynamic} from "@bedrock/base";
import type { EntityProperty, MetadataEntry} from "../types/index.js";
import { EntityFloatProperty, EntityIntProperty, MetadataEntryType } from "../types/index.js";

@PacketId(PacketIds.SetEntityData)
export class UpdateEntityDataPacket extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeEntityId!: bigint;
	@SerializeAs(MetadataEntryType) @AsList(VarInt) public metadata!: MetadataEntry[];
	@SerializeAs(EntityIntProperty) @AsList(VarInt) public intProperties!: EntityProperty[];
	@SerializeAs(EntityFloatProperty) @AsList(VarInt) public floatProperties!: EntityProperty[];
	@SerializeAs(VarLong) public tick!: bigint;
}
