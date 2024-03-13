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
	Dynamic,
} from "@bedrock/base";
import { AbilityLayer, CommandPermissionLevel, PermissionLevel } from "../types/index.js";

@PacketId(PacketIds.UpdateAbilities)
export class UpdateAbilitiesPacket extends ProtocolPacket {
	@SerializeAs(Int64, Endianness.Little) public entityId!: bigint;
	@SerializeAs(Byte) public permissionLevel!: PermissionLevel;
	@SerializeAs(Byte) public commandPermissionLevel!: CommandPermissionLevel;
	@SerializeAs(AbilityLayer) @AsList(Byte) public abilities!: AbilityLayer[]; // Uint8
}
