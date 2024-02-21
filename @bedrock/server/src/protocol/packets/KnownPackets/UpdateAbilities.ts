import { AsList, Byte, Endianness, Int64, SerializeAs } from "@bedrock/base";
import { CommandPermissionLevel, PermissionLevel } from "../../../types";
import { AbilityLayer } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.UpdateAbilities)
export class UpdateAbilitiesPacket extends ProtocolPacket {
	@SerializeAs(Int64, Endianness.Little) public entityId!: bigint;
	@SerializeAs(Byte) public permissionLevel!: PermissionLevel;
	@SerializeAs(Byte) public commandPersmissionLevel!: CommandPermissionLevel;
	@SerializeAs(AbilityLayer) @AsList(Byte) public abilities!: AbilityLayer[]; // Uint8
}
