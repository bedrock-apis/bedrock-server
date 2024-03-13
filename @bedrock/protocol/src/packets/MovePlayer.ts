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
	Condition,
} from "@bedrock/base";
import { MoveMode, TeleportCause } from "../types/index.js";

@PacketId(PacketIds.MovePlayer)
export class MovePlayerPacket extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeId!: bigint;
	@SerializeAs(Vector3f) public position!: Vector3;
	/**
	 * @description Pith = x, Yaw = y
	 */
	@SerializeAs(Vector2f, Endianness.Little) public rotation!: Vector2;
	@SerializeAs(Float, Endianness.Little) public headYaw!: number;
	@SerializeAs(Byte) public mode!: MoveMode;
	@SerializeAs(Bool) public onGround!: boolean;
	@SerializeAs(VarLong) public riddenRuntimeId!: bigint;
	@SerializeAs(TeleportCause)
	@Condition((t) => t.mode === MoveMode.Teleport)
	public cause?: TeleportCause;
	@SerializeAs(VarLong) public tick!: bigint;
}
