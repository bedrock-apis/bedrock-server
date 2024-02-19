import { Bool, Byte, Condition, Endianness, Float, SerializeAs, VarLong, Vector3, Vector3f } from "@bedrock/base";
import { MoveMode } from "../../../types";
import { TeleportCause } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.MovePlayer)
export class MovePlayer extends ProtocolPacket {
	@SerializeAs(VarLong) public runtimeId!: bigint;
	@SerializeAs(Vector3f) public position!: Vector3;
	@SerializeAs(Float, Endianness.Little) public pitch!: number;
	@SerializeAs(Float, Endianness.Little) public yaw!: number;
	@SerializeAs(Float, Endianness.Little) public headYaw!: number;
	@SerializeAs(Byte) public mode!: MoveMode;
	@SerializeAs(Bool) public onGround!: boolean;
	@SerializeAs(VarLong) public riddenRuntimeId!: bigint;
    
	@SerializeAs(TeleportCause) 
    @Condition(t=>t.mode === MoveMode.Teleport) 
	public cause?: TeleportCause;
    
	@SerializeAs(VarLong) public tick!: bigint;
}
