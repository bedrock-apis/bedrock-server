import { Bool, Endianness, Int16, ProtocolSerializable, SerializeAs, VarString, LRootTag, UInt16, VarInt, Condition, ZigZag, AsList, Byte, Vector2, Vector3, VarLong, Vector3f } from "@bedrock/base";
import { ItemReleaseAction, UseItemAction, UseItemOnEntityAction } from "../enums/Actions.js";
import { TransactionSourceType } from "../enums/Transactions.js";
import { BlockCoordinates } from "./BlockCoordinates.js";
import { ItemStack, ItemStackLike } from "./Items.js";

export interface TransactionActionLike{
    action?: number;
    flags?: number;
    inventoryId?: number;
    newItem?: ItemStackLike;
    oldItem?: ItemStackLike;
    slot?: number;
    sourceType: TransactionSourceType;
}
export class TransactionAction extends ProtocolSerializable { // Varin
	@SerializeAs(VarInt) public sourceType!: TransactionSourceType;
	@SerializeAs(VarInt) @Condition(({sourceType:s})=>s === TransactionSourceType.Container || s === TransactionSourceType.Craft)
    public inventoryId?: number;
    @SerializeAs(VarInt) @Condition(({sourceType:s})=>s === TransactionSourceType.WorldInteraction)
    public flags?: number;
    @SerializeAs(VarInt) @Condition(({sourceType:s})=>s === TransactionSourceType.Craft || s === TransactionSourceType.CraftSlot)
    public action?: number;
    @SerializeAs(VarInt) public slot!: number;
    @SerializeAs(ItemStack) public oldItem!: ItemStackLike;
    @SerializeAs(ItemStack) public newItem!: ItemStackLike;
}
export interface ChangedContainerLike{
    containerId: number;
    slots?: number[];
}
export class ChangedContainer extends ProtocolSerializable {
	@SerializeAs(Byte) public containerId!: number;
    @SerializeAs(Byte) @AsList(VarInt) public slots!: number[];
}

export interface TransactionLegacyLike{
    changes?: ChangedContainerLike[];
    requestId: number;
}
export class TransactionLegacy extends ProtocolSerializable{
	@SerializeAs(ZigZag) public requestId!: TransactionSourceType;
    @SerializeAs(ChangedContainer) @AsList(VarInt) @Condition(e=>e.requestId>0) public changes?: ChangedContainerLike[];
}

export interface TransactionItemUseOnBlockLike{
    actionType: UseItemAction;
    blockPosition: Vector3;
    blockRuntimeId: number;
    face: number;
    hotbarSlot: number;
    item: ItemStackLike;
}
export class TransactionItemUseOnBlock extends ProtocolSerializable{
	@SerializeAs(VarInt) public actionType!: UseItemAction;
    @SerializeAs(BlockCoordinates) public blockPosition!: Vector3;
    @SerializeAs(ZigZag) public face!: number;
    @SerializeAs(ZigZag) public hotbarSlot!: number;
    @SerializeAs(ItemStack) public item!: ItemStackLike;
    @SerializeAs(VarInt) public blockRuntimeId!: number;
}

export interface TransactionItemUseOnEntityLike{
    actionType: UseItemOnEntityAction;
    clickPosition: Vector3;
    entityRuntimeId: bigint;
    hotbarSlot: number;
    item: ItemStackLike;
    playerPosition: Vector3;
}
export class TransactionItemUseOnEntity extends ProtocolSerializable{
	@SerializeAs(VarLong) public entityRuntimeId!: bigint;
    @SerializeAs(VarInt) public actionType!: UseItemOnEntityAction;
    @SerializeAs(ZigZag) public hotbarSlot!: number;
    @SerializeAs(ItemStack) public item!: ItemStackLike;
    @SerializeAs(Vector3f) public playerPosition!: Vector3;
    @SerializeAs(Vector3f) public clickPosition!: Vector3;
}



export interface TransactionItemReleaseLike{
    actionType: UseItemOnEntityAction;
    clickPosition: Vector3;
    entityRuntimeId: bigint;
    hotbarSlot: number;
    item: ItemStackLike;
    playerPosition: Vector3;
}
export class TransactionItemRelease extends ProtocolSerializable{
    @SerializeAs(VarInt) public actionType!: ItemReleaseAction;
    @SerializeAs(ZigZag) public hotbarSlot!: number;
    @SerializeAs(ItemStack) public item!: ItemStackLike;
    @SerializeAs(Vector3f) public headPosition!: Vector3;
}
