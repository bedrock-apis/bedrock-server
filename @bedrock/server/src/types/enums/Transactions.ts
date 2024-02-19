export enum TransactionSourceType {
	Container,
	Global,
	WorldInteraction,
	Creative,
	CraftSlot = 100,
	Craft = 9_999,
}
export enum TransactionType {
	Normal,
	InventoryMismatch,
	ItemUse,
	ItemUseOnEntity,
	ItemRelease,
}
