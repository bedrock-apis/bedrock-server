import { AsList, ProtocolType, SerializeAs, VarInt, VarLong } from "@bedrock/base";
import type { MetadataEntry, EntityProperty} from "../../types";
import { EntityFloatProperty, EntityIntProperty, MetadataEntryType } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.SetEntityData)
export class UpdateEntityDataPacket extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeEntityId!: bigint;
	@SerializeAs(MetadataEntryType) @AsList(VarInt) public metadata!: MetadataEntry[];
	@SerializeAs(EntityIntProperty) @AsList(VarInt) public intProperties!: EntityProperty[];
	@SerializeAs(EntityFloatProperty) @AsList(VarInt) public floatProperties!: EntityProperty[];
	@SerializeAs(VarLong) public tick!: bigint;
}
