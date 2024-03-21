import {
    AsList,
	Byte,
	Condition,
	Dynamic,
	PacketId,
	PacketIds,
	ProtocolPacket,
	SerializeAs,
	VarInt,
	VarLong,
	Vector3,
	Vector3f,
	ZigZag,
} from "@bedrock/base";
import type { ItemLegacyLike, TransactionActionLike } from "../types/index.js";
import { ItemEntries, InteractActions, ClientActionIds, BlockCoordinates, TransactionLegacy, TransactionLegacyLike , TransactionType, TransactionAction, TransactionItemUseOnBlock, TransactionItemUseOnEntity, TransactionItemRelease } from "../types/index.js";

@PacketId(PacketIds.InventoryTransaction)
export class InventoryTransactionPacket extends ProtocolPacket {
    @SerializeAs(TransactionLegacy) public legacy!: TransactionLegacyLike;
    @SerializeAs(VarInt) public transactionType!: TransactionType;
    @SerializeAs(TransactionAction) @AsList(VarInt) public actions!: TransactionActionLike[];
    @Dynamic(e=>{
        switch (e.transactionType) {
            case TransactionType.InventoryMismatch:
            case TransactionType.Normal:
                return null;
            case TransactionType.ItemUse: return TransactionItemUseOnBlock;
            case TransactionType.ItemUseOnEntity: return TransactionItemUseOnEntity;
            case TransactionType.ItemRelease: return TransactionItemRelease;
            default: return null;
        }
    }) public data!: TransactionActionLike[];
}
