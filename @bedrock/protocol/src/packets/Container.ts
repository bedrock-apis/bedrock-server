import {
	Byte,
	Condition,
	PacketId,
	PacketIds,
	ProtocolPacket,
	SByte,
	SerializeAs,
	VarInt,
	VarLong,
	Vector3,
	Vector3f,
	ZigZong,
} from "@bedrock/base";
import type { ItemLegacyLike } from "../types/index.js";
import { ItemEntries, InteractActions, BlockCoordinates, WindowsIds, WindowsTypes } from "../types/index.js";

@PacketId(PacketIds.ContainerOpen)
export class ContainerOpenPacket extends ProtocolPacket {
	@SerializeAs(SByte) public windowId!: WindowsIds;
	@SerializeAs(SByte) public windowType!: WindowsTypes;
	@SerializeAs(BlockCoordinates) public position!: Vector3;
	@SerializeAs(ZigZong) public targetRuntimeEntityId!: bigint;
}
@PacketId(PacketIds.ContainerClose)
export class ContainerClosePacket extends ProtocolPacket {
	@SerializeAs(SByte) public windowId!: WindowsIds;
	@SerializeAs(Boolean) public server = true;
}
