export enum ClientActionIds {
	StartBreak = 0,
	AbortBreak = 1,
	StopBreak = 2,
	GetUpdatedBlock = 3,
	DropItem = 4,
	StartSleeping = 5,
	StopSleeping = 6,
	Respawn = 7,
	Jump = 8,
	StartSprint = 9,
	StopSprint = 10,
	StartSneak = 11,
	StopSneak = 12,
	CreativePlayerDestroyBlock = 13,
	DimensionChangeAck = 14,
	StartGlide = 15,
	StopGlide = 16,
	BuildDenied = 17,
	CrackBreak = 18,
	ChangeSkin = 19,
	SetEnchantmentSeed = 20,
	Swimming = 21,
	StopSwimming = 22,
	StartSpinAttack = 23,
	StopSpinAttack = 24,
	InteractBlock = 25,
	PredictBreak = 26,
	ContinueBreak = 27,
	StartItemUseOn = 28,
	StopItemUseOn = 29,
	HandledTeleport = 30,
	MissedSwing = 31,
	StartCrawling = 32,
	StopCrawling = 33,
	StartFlying = 34,
	StopFlying = 35,
	ReceivedServerData = 36,
}
export enum InteractActions {
	LeaveVehicle = 3,
	MouseOverEntity = 4,
	NpcOpen = 5,
	OpenInventory = 6,
}
export enum ItemReleaseAction {
	Release,
	Consume,
}
export enum RecordAction {
	Add,
	Remove,
}

export enum UseItemOnEntityAction {
	Interact,
	Attack,
}

export enum UseItemAction {
	ClickBlock,
	ClickAir,
	BreakBlock,
}
