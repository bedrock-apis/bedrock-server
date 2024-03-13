import {
	Byte,
	Condition,
	PacketId,
	PacketIds,
	ProtocolPacket,
	SerializeAs,
	VarInt,
	VarLong,
	Vector3,
	Vector3f,
} from "@bedrock/base";
import type { ItemLegacyLike } from "../types/index.js";
import { ItemEntries, InteractActions } from "../types/index.js";

@PacketId(PacketIds.Interact)
export class InteractPacket extends ProtocolPacket {
	@SerializeAs(Byte) public actionId!: InteractActions;
	@SerializeAs(VarLong) public targetRuntimeEntityId!: bigint;
	@SerializeAs(Vector3f)
	@Condition((t) => t.actionId === InteractActions.MouseOverEntity || t.actionId === InteractActions.LeaveVehicle)
	public position?: Vector3;
}
