import { Byte, Condition, PacketId, PacketIds, ProtocolPacket, SerializeAs, VarInt, VarLong, Vector3, Vector3f, ZigZag } from "@bedrock/base";
import type { ItemLegacyLike } from "../types/index.js";
import { ItemEntries , InteractActions, ClientActionIds, BlockCoordinates} from "../types/index.js";


@PacketId(PacketIds.PlayerAction)
export class PlayerActionPacket extends ProtocolPacket {
    @SerializeAs(VarLong) public targetRuntimeEntityId!: bigint;
    @SerializeAs(ZigZag) public actionId!: ClientActionIds;
    @SerializeAs(BlockCoordinates) public position!: Vector3;
    @SerializeAs(BlockCoordinates) public resultPosition!: Vector3;
    @SerializeAs(ZigZag) public face!: number;
}
