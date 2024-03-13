
import type {Buffer ,Vector3 ,Vector2} from "@bedrock/base";
import {ProtocolPacket, PacketId, VarLong, VarInt, ZigZag, ZigZong, UUID, VarBuffer, BedrockNBT, LightNBT, SByte, Byte, Bool, Int32, UInt32, Int16, UInt16, Int64, UInt64, Vector3f, Vector3i, VarVector3, ZigZagVector3} from "@bedrock/base";

// Complex Array: BehaviourPackInfos

// Complex Array: TexturePackInfos

// Complex Array: ResourcePackIdVersions

export type ResourcePackIds = string[]; // Int16

export interface ExperimentLike{
	name: string;
	enabled: boolean; // Bool
}
export type Experiments = Experiment[]; // Int32

export enum GameMode{
	survival=0,
	creative=1,
	adventure=2,
	survival_spectator=3,
	creative_spectator=4,
	fallback=5,
	spectator=6,
}

export interface GameRuleLike{
	name: string;
	editable: boolean; // Bool
	type: null;
	value: null;
}
export type GameRules = GameRule[]; // VarInt

export interface BlobLike{
	hash: bigint; // UInt64
	payload: Buffer; // VarBuffer
}
// Complex Array: BlockProperties

// Complex Array: Itemstates

export interface ItemExtraDataWithBlockingTickLike{
	hasNbt: null;
	nbt: null;
	canPlaceOn: null;
	canDestroy: null;
	blockingTick: bigint; // Int64
}
export interface ItemExtraDataWithoutBlockingTickLike{
	hasNbt: null;
	nbt: null;
	canPlaceOn: null;
	canDestroy: null;
}
export interface ItemLegacyLike{
	networkId: number; // ZigZag
}
export interface ItemLike{
	networkId: number; // ZigZag
}
export interface vec2fLike{
	x: null; // lf32
	z: null; // lf32
}
export interface Vec3foptsLike{
	x: null;
	y: null;
	z: null;
}
export interface Vec2foptsLike{
	x: null;
	y: null;
}
// Complex Array: MetadataDictionary

export interface LinkLike{
	riddenEntityId: bigint; // ZigZong
	riderEntityId: bigint; // ZigZong
	type: number; // Byte
	immediate: boolean; // Bool
	riderInitiated: boolean; // Bool
}
export type Links = Link[]; // VarInt

// Complex Array: EntityAttributes

export interface EntityPropertiesLike{
	ints: null;
	floats: null;
}
export interface RotationLike{
	yaw: byterot;
	pitch: byterot;
	headYaw: byterot;
}
export interface BlockCoordinatesLike{
	x: number; // ZigZag
	y: number; // VarInt
	z: number; // ZigZag
}
// Complex Array: PlayerAttributes

export interface TransactionUseItemLike{
	actionType: null;
	blockPosition: BlockCoordinates;
	face: number; // ZigZag
	hotbarSlot: number; // ZigZag
	heldItem: Item;
	playerPos: Vector3; // Vector3f
	clickPos: Vector3; // Vector3f
	blockRuntimeId: number; // VarInt
}
// Complex Array: TransactionActions

export interface TransactionLegacyLike{
	legacyRequestId: number; // ZigZag
	legacyTransactions: null;
}
export interface TransactionLike{
	legacy: TransactionLegacy;
	transactionType: null;
	actions: TransactionActions;
	transactionData: null;
}
export type ItemStacks = Item[]; // VarInt

export interface RecipeIngredientLike{
	type: null;
	count: number; // ZigZag
}
// Complex Array: PotionTypeRecipes

// Complex Array: PotionContainerChangeRecipes

// Complex Array: Recipes

export interface SkinImageLike{
	width: number; // Int32
	height: number; // Int32
	data: Buffer; // VarBuffer
}
export interface SkinLike{
	skinId: string;
	playFabId: string;
	skinResourcePack: string;
	skinData: SkinImage;
	animations: null;
	capeData: SkinImage;
	geometryData: string;
	geometryDataVersion: string;
	animationData: string;
	capeId: string;
	fullSkinId: string;
	armSize: string;
	skinColor: string;
	personalPieces: null;
	pieceTintColors: null;
	premium: boolean; // Bool
	persona: boolean; // Bool
	capeOnClassic: boolean; // Bool
	primaryUser: boolean; // Bool
	overridingPlayerAppearance: boolean; // Bool
}
export interface PlayerRecordsLike{
	type: null;
	recordsCount: number; // VarInt
	records: null;
	verified: null;
}
export interface EnchantLike{
	id: number; // Byte
	level: number; // Byte
}
export interface EnchantOptionLike{
	cost: number; // VarInt
	slotFlags: number; // Int32
	equipEnchants: null;
	heldEnchants: null;
	selfEnchants: null;
	name: string;
	optionId: number; // ZigZag
}
export enum Action{
	start_break=0,
	abort_break=1,
	stop_break=2,
	get_updated_block=3,
	drop_item=4,
	start_sleeping=5,
	stop_sleeping=6,
	respawn=7,
	jump=8,
	start_sprint=9,
	stop_sprint=10,
	start_sneak=11,
	stop_sneak=12,
	creative_player_destroy_block=13,
	dimension_change_ack=14,
	start_glide=15,
	stop_glide=16,
	build_denied=17,
	crack_break=18,
	change_skin=19,
	set_enchatnment_seed=20,
	swimming=21,
	stop_swimming=22,
	start_spin_attack=23,
	stop_spin_attack=24,
	interact_block=25,
	predict_break=26,
	continue_break=27,
	start_item_use_on=28,
	stop_item_use_on=29,
	handled_teleport=30,
	missed_swing=31,
	start_crawling=32,
	stop_crawling=33,
	start_flying=34,
	stop_flying=35,
	received_server_data=36,
}

export interface StackRequestSlotInfoLike{
	slotType: ContainerSlotType;
	slot: number; // Byte
	stackId: number; // ZigZag
}
export interface ItemStackRequestLike{
	requestId: number; // ZigZag
	actions: null;
	customNames: null;
	cause: null;
}
// Complex Array: ItemStackResponses

// Complex Array: ItemComponentList

export interface CommandOriginLike{
	type: null;
	uuid: string; // UUID
	requestId: string;
	playerEntityId: null;
}
export interface TrackedObjectLike{
	type: null;
	entityUniqueId: null;
	blockPosition: null;
}
export interface MapDecorationLike{
	type: null;
	rotation: number; // Byte
	x: number; // Byte
	y: number; // Byte
	label: string;
	colorAbgr: number; // VarInt
}
export interface StructureBlockSettingsLike{
	paletteName: string;
	ignoreEntities: boolean; // Bool
	ignoreBlocks: boolean; // Bool
	nonTickingPlayersAndTickingAreas: boolean; // Bool
	size: BlockCoordinates;
	structureOffset: BlockCoordinates;
	lastEditingPlayerUniqueId: bigint; // ZigZong
	rotation: null;
	mirror: null;
	animationMode: null;
	animationDuration: null; // lf32
	integrity: null; // lf32
	seed: number; // UInt32
	pivot: Vector3; // Vector3f
}
export interface EducationSharedResourceURILike{
	buttonName: string;
	linkUri: string;
}
export interface EducationExternalLinkSettingsLike{
	url: string;
	displayName: string;
}
export interface BlockUpdateLike{
	position: BlockCoordinates;
	runtimeId: number; // VarInt
	flags: number; // VarInt
	entityUniqueId: bigint; // ZigZong
	transitionType: null;
}
export interface MaterialReducerLike{
	mix: number; // ZigZag
	items: null;
}
export enum PermissionLevel{
	visitor=0,
	member=1,
	operator=2,
	custom=3,
}

export enum CommandPermissionLevel{
	normal=0,
	operator=1,
	automation=2,
	host=3,
	owner=4,
	internal=5,
}

export enum CommandPermissionLevelVarint{
	normal=0,
	operator=1,
	automation=2,
	host=3,
	owner=4,
	internal=5,
}

export enum WindowID{
	inventory=0,
	first=1,
	last=100,
	offhand=119,
	armor=120,
	creative=121,
	hotbar=122,
	fixed_inventory=123,
	ui=124,
	drop_contents=-100,
	beacon=-24,
	trading_output=-23,
	trading_use_inputs=-22,
	trading_input_2=-21,
	trading_input_1=-20,
	enchant_output=-17,
	enchant_material=-16,
	enchant_input=-15,
	anvil_output=-13,
	anvil_result=-12,
	anvil_material=-11,
	container_input=-10,
	crafting_use_ingredient=-5,
	crafting_result=-4,
	crafting_remove_ingredient=-3,
	crafting_add_ingredient=-2,
	none=-1,
}

export enum WindowIDVarint{
	inventory=0,
	first=1,
	last=100,
	offhand=119,
	armor=120,
	creative=121,
	hotbar=122,
	fixed_inventory=123,
	ui=124,
	drop_contents=-100,
	beacon=-24,
	trading_output=-23,
	trading_use_inputs=-22,
	trading_input_2=-21,
	trading_input_1=-20,
	enchant_output=-17,
	enchant_material=-16,
	enchant_input=-15,
	anvil_output=-13,
	anvil_result=-12,
	anvil_material=-11,
	container_input=-10,
	crafting_use_ingredient=-5,
	crafting_result=-4,
	crafting_remove_ingredient=-3,
	crafting_add_ingredient=-2,
	none=-1,
}

export enum WindowType{
	container=0,
	workbench=1,
	furnace=2,
	enchantment=3,
	brewing_stand=4,
	anvil=5,
	dispenser=6,
	dropper=7,
	hopper=8,
	cauldron=9,
	minecart_chest=10,
	minecart_hopper=11,
	horse=12,
	beacon=13,
	structure_editor=14,
	trading=15,
	command_block=16,
	jukebox=17,
	armor=18,
	hand=19,
	compound_creator=20,
	element_constructor=21,
	material_reducer=22,
	lab_table=23,
	loom=24,
	lectern=25,
	grindstone=26,
	blast_furnace=27,
	smoker=28,
	stonecutter=29,
	cartography=30,
	hud=31,
	jigsaw_editor=32,
	smithing_table=33,
	chest_boat=34,
	decorated_pot=35,
	crafter=36,
	none=-9,
	inventory=-1,
}

export enum ContainerSlotType{
	anvil_input=0,
	anvil_material=1,
	anvil_result=2,
	smithing_table_input=3,
	smithing_table_material=4,
	smithing_table_result=5,
	armor=6,
	container=7,
	beacon_payment=8,
	brewing_input=9,
	brewing_result=10,
	brewing_fuel=11,
	hotbar_and_inventory=12,
	crafting_input=13,
	crafting_output=14,
	recipe_construction=15,
	recipe_nature=16,
	recipe_items=17,
	recipe_search=18,
	recipe_search_bar=19,
	recipe_equipment=20,
	recipe_book=21,
	enchanting_input=22,
	enchanting_lapis=23,
	furnace_fuel=24,
	furnace_ingredient=25,
	furnace_output=26,
	horse_equip=27,
	hotbar=28,
	inventory=29,
	shulker=30,
	trade_ingredient1=31,
	trade_ingredient2=32,
	trade_result=33,
	offhand=34,
	compcreate_input=35,
	compcreate_output=36,
	elemconstruct_output=37,
	matreduce_input=38,
	matreduce_output=39,
	labtable_input=40,
	loom_input=41,
	loom_dye=42,
	loom_material=43,
	loom_result=44,
	blast_furnace_ingredient=45,
	smoker_ingredient=46,
	trade2_ingredient1=47,
	trade2_ingredient2=48,
	trade2_result=49,
	grindstone_input=50,
	grindstone_additional=51,
	grindstone_result=52,
	stonecutter_input=53,
	stonecutter_result=54,
	cartography_input=55,
	cartography_additional=56,
	cartography_result=57,
	barrel=58,
	cursor=59,
	creative_output=60,
	smithing_table_template=61,
	crafter=62,
}

export enum SoundType{
	ItemUseOn=0,
	Hit=1,
	Step=2,
	Fly=3,
	Jump=4,
	Break=5,
	Place=6,
	HeavyStep=7,
	Gallop=8,
	Fall=9,
	Ambient=10,
	AmbientBaby=11,
	AmbientInWater=12,
	Breathe=13,
	Death=14,
	DeathInWater=15,
	DeathToZombie=16,
	Hurt=17,
	HurtInWater=18,
	Mad=19,
	Boost=20,
	Bow=21,
	SquishBig=22,
	SquishSmall=23,
	FallBig=24,
	FallSmall=25,
	Splash=26,
	Fizz=27,
	Flap=28,
	Swim=29,
	Drink=30,
	Eat=31,
	Takeoff=32,
	Shake=33,
	Plop=34,
	Land=35,
	Saddle=36,
	Armor=37,
	MobArmorStandPlace=38,
	AddChest=39,
	Throw=40,
	Attack=41,
	AttackNoDamage=42,
	AttackStrong=43,
	Warn=44,
	Shear=45,
	Milk=46,
	Thunder=47,
	Explode=48,
	Fire=49,
	Ignite=50,
	Fuse=51,
	Stare=52,
	Spawn=53,
	Shoot=54,
	BreakBlock=55,
	Launch=56,
	Blast=57,
	LargeBlast=58,
	Twinkle=59,
	Remedy=60,
	Infect=61,
	LevelUp=62,
	BowHit=63,
	BulletHit=64,
	ExtinguishFire=65,
	ItemFizz=66,
	ChestOpen=67,
	ChestClosed=68,
	ShulkerBoxOpen=69,
	ShulkerBoxClosed=70,
	EnderChestOpen=71,
	EnderChestClosed=72,
	PowerOn=73,
	PowerOff=74,
	Attach=75,
	Detach=76,
	Deny=77,
	Tripod=78,
	Pop=79,
	DropSlot=80,
	Note=81,
	Thorns=82,
	PistonIn=83,
	PistonOut=84,
	Portal=85,
	Water=86,
	LavaPop=87,
	Lava=88,
	Burp=89,
	BucketFillWater=90,
	BucketFillLava=91,
	BucketEmptyWater=92,
	BucketEmptyLava=93,
	ArmorEquipChain=94,
	ArmorEquipDiamond=95,
	ArmorEquipGeneric=96,
	ArmorEquipGold=97,
	ArmorEquipIron=98,
	ArmorEquipLeather=99,
	ArmorEquipElytra=100,
	Record13=101,
	RecordCat=102,
	RecordBlocks=103,
	RecordChirp=104,
	RecordFar=105,
	RecordMall=106,
	RecordMellohi=107,
	RecordStal=108,
	RecordStrad=109,
	RecordWard=110,
	Record11=111,
	RecordWait=112,
	StopRecord=113,
	Flop=114,
	GuardianCurse=115,
	MobWarning=116,
	MobWarningBaby=117,
	Teleport=118,
	ShulkerOpen=119,
	ShulkerClose=120,
	Haggle=121,
	HaggleYes=122,
	HaggleNo=123,
	HaggleIdle=124,
	ChorusGrow=125,
	ChorusDeath=126,
	Glass=127,
	PotionBrewed=128,
	CastSpell=129,
	PrepareAttackSpell=130,
	PrepareSummon=131,
	PrepareWololo=132,
	Fang=133,
	Charge=134,
	CameraTakePicture=135,
	LeashKnotPlace=136,
	LeashKnotBreak=137,
	AmbientGrowl=138,
	AmbientWhine=139,
	AmbientPant=140,
	AmbientPurr=141,
	AmbientPurreow=142,
	DeathMinVolume=143,
	DeathMidVolume=144,
	ImitateBlaze=145,
	ImitateCaveSpider=146,
	ImitateCreeper=147,
	ImitateElderGuardian=148,
	ImitateEnderDragon=149,
	ImitateEnderman=150,
	ImitateEndermite=151,
	ImitateEvocationIllager=152,
	ImitateGhast=153,
	ImitateHusk=154,
	ImitateIllusionIllager=155,
	ImitateMagmaCube=156,
	ImitatePolarBear=157,
	ImitateShulker=158,
	ImitateSilverfish=159,
	ImitateSkeleton=160,
	ImitateSlime=161,
	ImitateSpider=162,
	ImitateStray=163,
	ImitateVex=164,
	ImitateVindicationIllager=165,
	ImitateWitch=166,
	ImitateWither=167,
	ImitateWitherSkeleton=168,
	ImitateWolf=169,
	ImitateZombie=170,
	ImitateZombiePigman=171,
	ImitateZombieVillager=172,
	EnderEyePlaced=173,
	EndPortalCreated=174,
	AnvilUse=175,
	BottleDragonBreath=176,
	PortalTravel=177,
	TridentHit=178,
	TridentReturn=179,
	TridentRiptide1=180,
	TridentRiptide2=181,
	TridentRiptide3=182,
	TridentThrow=183,
	TridentThunder=184,
	TridentHitGround=185,
	Default=186,
	FletchingTableUse=187,
	ElemConstructOpen=188,
	IceBombHit=189,
	BalloonPop=190,
	LtReactionIceBomb=191,
	LtReactionBleach=192,
	LtReactionElephantToothpaste=193,
	LtReactionElephantToothpaste2=194,
	LtReactionGlowStick=195,
	LtReactionGlowStick2=196,
	LtReactionLuminol=197,
	LtReactionSalt=198,
	LtReactionFertilizer=199,
	LtReactionFireball=200,
	LtReactionMagnesiumSalt=201,
	LtReactionMiscFire=202,
	LtReactionFire=203,
	LtReactionMiscExplosion=204,
	LtReactionMiscMystical=205,
	LtReactionMiscMystical2=206,
	LtReactionProduct=207,
	SparklerUse=208,
	GlowStickUse=209,
	SparklerActive=210,
	ConvertToDrowned=211,
	BucketFillFish=212,
	BucketEmptyFish=213,
	BubbleColumnUpwards=214,
	BubbleColumnDownwards=215,
	BubblePop=216,
	BubbleUpInside=217,
	BubbleDownInside=218,
	HurtBaby=219,
	DeathBaby=220,
	StepBaby=221,
	SpawnBaby=222,
	Born=223,
	TurtleEggBreak=224,
	TurtleEggCrack=225,
	TurtleEggHatched=226,
	LayEgg=227,
	TurtleEggAttacked=228,
	BeaconActivate=229,
	BeaconAmbient=230,
	BeaconDeactivate=231,
	BeaconPower=232,
	ConduitActivate=233,
	ConduitAmbient=234,
	ConduitAttack=235,
	ConduitDeactivate=236,
	ConduitShort=237,
	Swoop=238,
	BambooSaplingPlace=239,
	PreSneeze=240,
	Sneeze=241,
	AmbientTame=242,
	Scared=243,
	ScaffoldingClimb=244,
	CrossbowLoadingStart=245,
	CrossbowLoadingMiddle=246,
	CrossbowLoadingEnd=247,
	CrossbowShoot=248,
	CrossbowQuickChargeStart=249,
	CrossbowQuickChargeMiddle=250,
	CrossbowQuickChargeEnd=251,
	AmbientAggressive=252,
	AmbientWorried=253,
	CantBreed=254,
	ShieldBlock=255,
	LecternBookPlace=256,
	GrindstoneUse=257,
	Bell=258,
	CampfireCrackle=259,
	Roar=260,
	Stun=261,
	SweetBerryBushHurt=262,
	SweetBerryBushPick=263,
	CartographyTableUse=264,
	StonecutterUse=265,
	ComposterEmpty=266,
	ComposterFill=267,
	ComposterFillLayer=268,
	ComposterReady=269,
	BarrelOpen=270,
	BarrelClose=271,
	RaidHorn=272,
	LoomUse=273,
	AmbientInRaid=274,
	UicartographyTableUse=275,
	UistonecutterUse=276,
	UiloomUse=277,
	SmokerUse=278,
	BlastFurnaceUse=279,
	SmithingTableUse=280,
	Screech=281,
	Sleep=282,
	FurnaceUse=283,
	MooshroomConvert=284,
	MilkSuspiciously=285,
	Celebrate=286,
	JumpPrevent=287,
	AmbientPollinate=288,
	BeehiveDrip=289,
	BeehiveEnter=290,
	BeehiveExit=291,
	BeehiveWork=292,
	BeehiveShear=293,
	HoneybottleDrink=294,
	AmbientCave=295,
	Retreat=296,
	ConvertToZombified=297,
	Admire=298,
	StepLava=299,
	Tempt=300,
	Panic=301,
	Angry=302,
	AmbientMoodWarpedForest=303,
	AmbientMoodSoulsandValley=304,
	AmbientMoodNetherWastes=305,
	AmbientMoodBasaltDeltas=306,
	AmbientMoodCrimsonForest=307,
	RespawnAnchorCharge=308,
	RespawnAnchorDeplete=309,
	RespawnAnchorSetSpawn=310,
	RespawnAnchorAmbient=311,
	SoulEscapeQuiet=312,
	SoulEscapeLoud=313,
	RecordPigstep=314,
	LinkCompassToLodestone=315,
	UseSmithingTable=316,
	EquipNetherite=317,
	AmbientLoopWarpedForest=318,
	AmbientLoopSoulsandValley=319,
	AmbientLoopNetherWastes=320,
	AmbientLoopBasaltDeltas=321,
	AmbientLoopCrimsonForest=322,
	AmbientAdditionWarpedForest=323,
	AmbientAdditionSoulsandValley=324,
	AmbientAdditionNetherWastes=325,
	AmbientAdditionBasaltDeltas=326,
	AmbientAdditionCrimsonForest=327,
	SculkSensorPowerOn=328,
	SculkSensorPowerOff=329,
	BucketFillPowderSnow=330,
	BucketEmptyPowderSnow=331,
	PointedDripstoneCauldronDripWater=332,
	PointedDripstoneCauldronDripLava=333,
	PointedDripstoneDripWater=334,
	PointedDripstoneDripLava=335,
	CaveVinesPickBerries=336,
	BigDripleafTiltDown=337,
	BigDripleafTiltUp=338,
	CopperWaxOn=339,
	CopperWaxOff=340,
	Scrape=341,
	PlayerHurtDrown=342,
	PlayerHurtOnFire=343,
	PlayerHurtFreeze=344,
	UseSpyglass=345,
	StopUsingSpyglass=346,
	AmethystBlockChime=347,
	AmbientScreamer=348,
	HurtScreamer=349,
	DeathScreamer=350,
	MilkScreamer=351,
	JumpToBlock=352,
	PreRam=353,
	PreRamScreamer=354,
	RamImpact=355,
	RamImpactScreamer=356,
	SquidInkSquirt=357,
	GlowSquidInkSquirt=358,
	ConvertToStray=359,
	CakeAddCandle=360,
	ExtinguishCandle=361,
	AmbientCandle=362,
	BlockClick=363,
	BlockClickFail=364,
	SculkCatalystBloom=365,
	SculkShriekerShriek=366,
	WardenNearbyClose=367,
	WardenNearbyCloser=368,
	WardenNearbyClosest=369,
	WardenSlightlyAngry=370,
	RecordOtherside=371,
	Tongue=372,
	CrackIronGolem=373,
	RepairIronGolem=374,
	Listening=375,
	Heartbeat=376,
	HornBreak=377,
	SculkPlace=378,
	SculkSpread=379,
	SculkCharge=380,
	SculkSensorPlace=381,
	SculkShriekerPlace=382,
	goat_call_0=383,
	goat_call_1=384,
	goat_call_2=385,
	goat_call_3=386,
	goat_call_4=387,
	goat_call_5=388,
	goat_call_6=389,
	goat_call_7=390,
	goat_call_8=391,
	goat_call_9=392,
	goat_harmony_0=393,
	goat_harmony_1=394,
	goat_harmony_2=395,
	goat_harmony_3=396,
	goat_harmony_4=397,
	goat_harmony_5=398,
	goat_harmony_6=399,
	goat_harmony_7=400,
	goat_harmony_8=401,
	goat_harmony_9=402,
	goat_melody_0=403,
	goat_melody_1=404,
	goat_melody_2=405,
	goat_melody_3=406,
	goat_melody_4=407,
	goat_melody_5=408,
	goat_melody_6=409,
	goat_melody_7=410,
	goat_melody_8=411,
	goat_melody_9=412,
	goat_bass_0=413,
	goat_bass_1=414,
	goat_bass_2=415,
	goat_bass_3=416,
	goat_bass_4=417,
	goat_bass_5=418,
	goat_bass_6=419,
	goat_bass_7=420,
	goat_bass_8=421,
	goat_bass_9=422,
	_=423,
	_=424,
	_=425,
	ImitateWarden=426,
	ListeningAngry=427,
	ItemGiven=428,
	ItemTaken=429,
	Disappeared=430,
	Reappeared=431,
	DrinkMilk=432,
	FrogspawnHatched=433,
	LaySpawn=434,
	FrogspawnBreak=435,
	SonicBoom=436,
	SonicCharge=437,
	SoundeventItemThrown=438,
	Record5=439,
	ConvertToFrog=440,
	RecordPlaying=441,
	DrinkMilk=442,
	RecordPlaying=443,
	EnchantingTableUse=444,
	StepSand=445,
	DashReady=446,
	BundleDropContents=447,
	BundleInsert=448,
	BundleRemoveOne=449,
	PressurePlateClickOff=450,
	PressurePlateClickOn=451,
	ButtonClickOff=452,
	ButtonClickOn=453,
	DoorOpen=454,
	DoorClose=455,
	TrapdoorOpen=456,
	TrapdoorClose=457,
	FenceGateOpen=458,
	FenceGateClose=459,
	Insert=460,
	Pickup=461,
	InsertEnchanted=462,
	PickupEnchanted=463,
	Brush=464,
	BrushCompleted=465,
	ShatterDecoratedPot=466,
	BreakDecoratedPot=467,
	SnifferEggCrack=468,
	SnifferEggHatched=469,
	WaxedSignInteractFail=470,
	RecordRelic=471,
	Bump=472,
	PumpkinCarve=473,
	ConvertHuskToZombie=474,
	PigDeath=475,
	HoglinZombified=476,
	AmbientUnderwaterEnter=477,
	AmbientUnderwaterExit=478,
	bottle_fill=479,
	bottle_empty=480,
	crafter_craft=481,
	crafter_fail=482,
	block_decorated_pot_insert=483,
	block_decorated_pot_insert_fail=484,
	crafter_disable_slot=485,
	block_copper_bulb_turn_on=486,
	block_copper_bulb_turn_off=487,
}

export enum LegacyEntityType{
	chicken=10,
	cow=11,
	pig=12,
	sheep=13,
	wolf=14,
	villager=15,
	mooshroom=16,
	squid=17,
	rabbit=18,
	bat=19,
	iron_golem=20,
	snow_golem=21,
	ocelot=22,
	horse=23,
	donkey=24,
	mule=25,
	skeleton_horse=26,
	zombie_horse=27,
	polar_bear=28,
	llama=29,
	parrot=30,
	dolphin=31,
	zombie=32,
	creeper=33,
	skeleton=34,
	spider=35,
	zombie_pigman=36,
	slime=37,
	enderman=38,
	silverfish=39,
	cave_spider=40,
	ghast=41,
	magma_cube=42,
	blaze=43,
	zombie_villager=44,
	witch=45,
	stray=46,
	husk=47,
	wither_skeleton=48,
	guardian=49,
	elder_guardian=50,
	npc=51,
	wither=52,
	ender_dragon=53,
	shulker=54,
	endermite=55,
	agent=56,
	vindicator=57,
	phantom=58,
	armor_stand=61,
	tripod_camera=62,
	player=63,
	item=64,
	tnt=65,
	falling_block=66,
	moving_block=67,
	xp_bottle=68,
	xp_orb=69,
	eye_of_ender_signal=70,
	ender_crystal=71,
	fireworks_rocket=72,
	thrown_trident=73,
	turtle=74,
	cat=75,
	shulker_bullet=76,
	fishing_hook=77,
	chalkboard=78,
	dragon_fireball=79,
	arrow=80,
	snowball=81,
	egg=82,
	painting=83,
	minecart=84,
	fireball=85,
	splash_potion=86,
	ender_pearl=87,
	leash_knot=88,
	wither_skull=89,
	boat=90,
	wither_skull_dangerous=91,
	lightning_bolt=93,
	small_fireball=94,
	area_effect_cloud=95,
	hopper_minecart=96,
	tnt_minecart=97,
	chest_minecart=98,
	command_block_minecart=100,
	lingering_potion=101,
	llama_spit=102,
	evocation_fang=103,
	evocation_illager=104,
	vex=105,
	ice_bomb=106,
	balloon=107,
	pufferfish=108,
	salmon=109,
	drowned=110,
	tropicalfish=111,
	cod=112,
	panda=113,
}

export enum DeviceOS{
	Undefined=0,
	Android=1,
	IOS=2,
	OSX=3,
	FireOS=4,
	GearVR=5,
	Hololens=6,
	Win10=7,
	Win32=8,
	Dedicated=9,
	TVOS=10,
	Orbis=11,
	NintendoSwitch=12,
	Xbox=13,
	WindowsPhone=14,
	Linux=15,
}

export interface AbilityLayersLike{
	type: null;
	allowed: AbilitySet;
	enabled: AbilitySet;
	flySpeed: null; // lf32
	walkSpeed: null; // lf32
}
export interface CameraPresetsLike{
	name: string;
	parent: string;
	position: Vec3fopts;
	rotation: Vec2fopts;
	audioListener: null;
	playerEffects: null;
}
export enum DisconnectFailReason{
	unknown=0,
	cant_connect_no_internet=1,
	no_permissions=2,
	unrecoverable_error=3,
	third_party_blocked=4,
	third_party_no_internet=5,
	third_party_bad_ip=6,
	third_party_no_server_or_server_locked=7,
	version_mismatch=8,
	skin_issue=9,
	invite_session_not_found=10,
	edu_level_settings_missing=11,
	local_server_not_found=12,
	legacy_disconnect=13,
	user_leave_game_attempted=14,
	platform_locked_skins_error=15,
	realms_world_unassigned=16,
	realms_server_cant_connect=17,
	realms_server_hidden=18,
	realms_server_disabled_beta=19,
	realms_server_disabled=20,
	cross_platform_disallowed=21,
	cant_connect=22,
	session_not_found=23,
	client_settings_incompatible_with_server=24,
	server_full=25,
	invalid_platform_skin=26,
	edition_version_mismatch=27,
	edition_mismatch=28,
	level_newer_than_exe_version=29,
	no_fail_occurred=30,
	banned_skin=31,
	timeout=32,
	server_not_found=33,
	outdated_server=34,
	outdated_client=35,
	no_premium_platform=36,
	multiplayer_disabled=37,
	no_wifi=38,
	world_corruption=39,
	no_reason=40,
	disconnected=41,
	invalid_player=42,
	logged_in_other_location=43,
	server_id_conflict=44,
	not_allowed=45,
	not_authenticated=46,
	invalid_tenant=47,
	unknown_packet=48,
	unexpected_packet=49,
	invalid_command_request_packet=50,
	host_suspended=51,
	login_packet_no_request=52,
	login_packet_no_cert=53,
	missing_client=54,
	kicked=55,
	kicked_for_exploit=56,
	kicked_for_idle=57,
	resource_pack_problem=58,
	incompatible_pack=59,
	out_of_storage=60,
	invalid_level=61,
	disconnect_packet_deprecated=62,
	block_mismatch=63,
	invalid_heights=64,
	invalid_widths=65,
	connection_lost=66,
	zombie_connection=67,
	shutdown=68,
	reason_not_set=69,
	loading_state_timeout=70,
	resource_pack_loading_failed=71,
	searching_for_session_loading_screen_failed=72,
	conn_protocol_version=73,
	subsystem_status_error=74,
	empty_auth_from_discovery=75,
	empty_url_from_discovery=76,
	expired_auth_from_discovery=77,
	unknown_signal_service_sign_in_failure=78,
	xbl_join_lobby_failure=79,
	unspecified_client_instance_disconnection=80,
	conn_session_not_found=81,
	conn_create_peer_connection=82,
	conn_ice=83,
	conn_connect_request=84,
	conn_connect_response=85,
	conn_negotiation_timeout=86,
	conn_inactivity_timeout=87,
	stale_connection_being_replaced=88,
	realms_session_not_found=89,
	bad_packet=90,
}

export interface mcpe_packetLike{
	name: null;
	params: null;
}
export @PacketId(0)
class LoginPacket extends ProtocolPacket {
	public protocolVersion!: null; // i32
	public tokens!: null;
}
export interface LoginTokensLike{
	identity: LittleString;
	client: LittleString;
}
export @PacketId(0)
class PlayStatusPacket extends ProtocolPacket {
	public status!: null;
}
export @PacketId(0)
class ServerToClientHandshakePacket extends ProtocolPacket {
	public token!: string;
}
export @PacketId(0)
class ClientToServerHandshakePacket extends ProtocolPacket {
}
export @PacketId(0)
class DisconnectPacket extends ProtocolPacket {
	public reason!: DisconnectFailReason;
	public hideDisconnectReason!: boolean; // Bool
	public message!: string;
}
export @PacketId(0)
class ResourcePacksInfoPacket extends ProtocolPacket {
	public mustAccept!: boolean; // Bool
	public hasScripts!: boolean; // Bool
	public forceServerPacks!: boolean; // Bool
	public behaviourPacks!: BehaviourPackInfos;
	public texturePacks!: TexturePackInfos;
	public resourcePackLinks!: null;
}
export @PacketId(0)
class ResourcePackStackPacket extends ProtocolPacket {
	public mustAccept!: boolean; // Bool
	public behaviorPacks!: ResourcePackIdVersions;
	public resourcePacks!: ResourcePackIdVersions;
	public gameVersion!: string;
	public experiments!: Experiments;
	public experimentsPreviouslyUsed!: boolean; // Bool
}
export @PacketId(0)
class ResourcePackClientResponsePacket extends ProtocolPacket {
	public responseStatus!: null;
	public resourcepackids!: ResourcePackIds;
}
export @PacketId(0)
class TextPacket extends ProtocolPacket {
	public type!: null;
	public needsTranslation!: boolean; // Bool
	public xuid!: string;
	public platformChatId!: string;
}
export @PacketId(0)
class SetTimePacket extends ProtocolPacket {
	public time!: number; // ZigZag
}
export @PacketId(0)
class StartGamePacket extends ProtocolPacket {
	public entityId!: bigint; // ZigZong
	public runtimeEntityId!: bigint; // VarLong
	public playerGamemode!: GameMode;
	public playerPosition!: Vector3; // Vector3f
	public rotation!: vec2f;
	public seed!: bigint; // UInt64
	public biomeType!: number; // Int16
	public biomeName!: string;
	public dimension!: null;
	public generator!: number; // ZigZag
	public worldGamemode!: GameMode;
	public difficulty!: number; // ZigZag
	public spawnPosition!: BlockCoordinates;
	public achievementsDisabled!: boolean; // Bool
	public editorWorldType!: null;
	public createdInEditor!: boolean; // Bool
	public exportedFromEditor!: boolean; // Bool
	public dayCycleStopTime!: number; // ZigZag
	public eduOffer!: number; // ZigZag
	public eduFeaturesEnabled!: boolean; // Bool
	public eduProductUuid!: string;
	public rainLevel!: null; // lf32
	public lightningLevel!: null; // lf32
	public hasConfirmedPlatformLockedContent!: boolean; // Bool
	public isMultiplayer!: boolean; // Bool
	public broadcastToLan!: boolean; // Bool
	public xboxLiveBroadcastMode!: number; // VarInt
	public platformBroadcastMode!: number; // VarInt
	public enableCommands!: boolean; // Bool
	public isTexturepacksRequired!: boolean; // Bool
	public gamerules!: GameRules;
	public experiments!: Experiments;
	public experimentsPreviouslyUsed!: boolean; // Bool
	public bonusChest!: boolean; // Bool
	public mapEnabled!: boolean; // Bool
	public permissionLevel!: PermissionLevel;
	public serverChunkTickRange!: number; // Int32
	public hasLockedBehaviorPack!: boolean; // Bool
	public hasLockedResourcePack!: boolean; // Bool
	public isFromLockedWorldTemplate!: boolean; // Bool
	public msaGamertagsOnly!: boolean; // Bool
	public isFromWorldTemplate!: boolean; // Bool
	public isWorldTemplateOptionLocked!: boolean; // Bool
	public onlySpawnV1Villagers!: boolean; // Bool
	public personaDisabled!: boolean; // Bool
	public customSkinsDisabled!: boolean; // Bool
	public emoteChatMuted!: boolean; // Bool
	public gameVersion!: string;
	public limitedWorldWidth!: number; // Int32
	public limitedWorldLength!: number; // Int32
	public isNewNether!: boolean; // Bool
	public eduResourceUri!: EducationSharedResourceURI;
	public experimentalGameplayOverride!: boolean; // Bool
	public chatRestrictionLevel!: null;
	public disablePlayerInteractions!: boolean; // Bool
	public levelId!: string;
	public worldName!: string;
	public premiumWorldTemplateId!: string;
	public isTrial!: boolean; // Bool
	public movementAuthority!: null;
	public rewindHistorySize!: number; // ZigZag
	public serverAuthoritativeBlockBreaking!: boolean; // Bool
	public currentTick!: bigint; // Int64
	public enchantmentSeed!: number; // ZigZag
	public blockProperties!: BlockProperties;
	public itemstates!: Itemstates;
	public multiplayerCorrelationId!: string;
	public serverAuthoritativeInventory!: boolean; // Bool
	public engine!: string;
	public propertyData!: object; // LightNBT
	public blockPalletteChecksum!: bigint; // UInt64
	public worldTemplateId!: string; // UUID
	public clientSideGeneration!: boolean; // Bool
	public blockNetworkIdsAreHashes!: boolean; // Bool
	public serverControlledSound!: boolean; // Bool
}
export @PacketId(0)
class AddPlayerPacket extends ProtocolPacket {
	public uuid!: string; // UUID
	public username!: string;
	public runtimeId!: bigint; // VarLong
	public platformChatId!: string;
	public position!: Vector3; // Vector3f
	public velocity!: Vector3; // Vector3f
	public pitch!: null; // lf32
	public yaw!: null; // lf32
	public headYaw!: null; // lf32
	public heldItem!: Item;
	public gamemode!: GameMode;
	public metadata!: MetadataDictionary;
	public properties!: EntityProperties;
	public uniqueId!: bigint; // Int64
	public permissionLevel!: PermissionLevel;
	public commandPermission!: CommandPermissionLevel;
	public abilities!: null;
	public links!: Links;
	public deviceId!: string;
	public deviceOs!: DeviceOS;
}
export @PacketId(0)
class AddEntityPacket extends ProtocolPacket {
	public uniqueId!: bigint; // ZigZong
	public runtimeId!: bigint; // VarLong
	public entityType!: string;
	public position!: Vector3; // Vector3f
	public velocity!: Vector3; // Vector3f
	public pitch!: null; // lf32
	public yaw!: null; // lf32
	public headYaw!: null; // lf32
	public bodyYaw!: null; // lf32
	public attributes!: EntityAttributes;
	public metadata!: MetadataDictionary;
	public properties!: EntityProperties;
	public links!: Links;
}
export @PacketId(0)
class RemoveEntityPacket extends ProtocolPacket {
	public entityIdSelf!: bigint; // ZigZong
}
export @PacketId(0)
class AddItemEntityPacket extends ProtocolPacket {
	public entityIdSelf!: bigint; // ZigZong
	public runtimeEntityId!: bigint; // VarLong
	public item!: Item;
	public position!: Vector3; // Vector3f
	public velocity!: Vector3; // Vector3f
	public metadata!: MetadataDictionary;
	public isFromFishing!: boolean; // Bool
}
export @PacketId(0)
class TakeItemEntityPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public target!: number; // VarInt
}
export @PacketId(0)
class MoveEntityPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public flags!: number; // Byte
	public position!: Vector3; // Vector3f
	public rotation!: Rotation;
}
export @PacketId(0)
class MovePlayerPacket extends ProtocolPacket {
	public runtimeId!: number; // VarInt
	public position!: Vector3; // Vector3f
	public pitch!: null; // lf32
	public yaw!: null; // lf32
	public headYaw!: null; // lf32
	public mode!: null;
	public onGround!: boolean; // Bool
	public riddenRuntimeId!: number; // VarInt
	public teleport!: null;
	public tick!: bigint; // VarLong
}
export @PacketId(0)
class RiderJumpPacket extends ProtocolPacket {
	public jumpStrength!: number; // ZigZag
}
export @PacketId(0)
class UpdateBlockPacket extends ProtocolPacket {
	public position!: BlockCoordinates;
	public blockRuntimeId!: number; // VarInt
	public flags!: UpdateBlockFlags;
	public layer!: number; // VarInt
}
export @PacketId(0)
class AddPaintingPacket extends ProtocolPacket {
	public entityIdSelf!: bigint; // ZigZong
	public runtimeEntityId!: bigint; // VarLong
	public coordinates!: Vector3; // Vector3f
	public direction!: number; // ZigZag
	public title!: string;
}
export @PacketId(0)
class TickSyncPacket extends ProtocolPacket {
	public requestTime!: bigint; // Int64
	public responseTime!: bigint; // Int64
}
export @PacketId(0)
class LevelSoundEventOldPacket extends ProtocolPacket {
	public soundId!: number; // Byte
	public position!: Vector3; // Vector3f
	public blockId!: number; // ZigZag
	public entityType!: number; // ZigZag
	public isBabyMob!: boolean; // Bool
	public isGlobal!: boolean; // Bool
}
export @PacketId(0)
class LevelEventPacket extends ProtocolPacket {
	public event!: null;
	public position!: Vector3; // Vector3f
	public data!: number; // ZigZag
}
export @PacketId(0)
class BlockEventPacket extends ProtocolPacket {
	public position!: BlockCoordinates;
	public type!: null;
	public data!: number; // ZigZag
}
export @PacketId(0)
class EntityEventPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public eventId!: null;
	public data!: number; // ZigZag
}
export @PacketId(0)
class MobEffectPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public eventId!: null;
	public effectId!: number; // ZigZag
	public amplifier!: number; // ZigZag
	public particles!: boolean; // Bool
	public duration!: number; // ZigZag
}
export @PacketId(0)
class UpdateAttributesPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public attributes!: PlayerAttributes;
	public tick!: bigint; // VarLong
}
export @PacketId(0)
class InventoryTransactionPacket extends ProtocolPacket {
	public transaction!: Transaction;
}
export @PacketId(0)
class MobEquipmentPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public item!: Item;
	public slot!: number; // Byte
	public selectedSlot!: number; // Byte
	public windowId!: WindowID;
}
export @PacketId(0)
class MobArmorEquipmentPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public helmet!: Item;
	public chestplate!: Item;
	public leggings!: Item;
	public boots!: Item;
}
export @PacketId(0)
class InteractPacket extends ProtocolPacket {
	public actionId!: null;
	public targetEntityId!: bigint; // VarLong
	public position!: null;
}
export @PacketId(0)
class BlockPickRequestPacket extends ProtocolPacket {
	public x!: number; // ZigZag
	public y!: number; // ZigZag
	public z!: number; // ZigZag
	public addUserData!: boolean; // Bool
	public selectedSlot!: number; // Byte
}
export @PacketId(0)
class EntityPickRequestPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // UInt64
	public selectedSlot!: number; // Byte
	public withData!: boolean; // Bool
}
export @PacketId(0)
class PlayerActionPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public action!: Action;
	public position!: BlockCoordinates;
	public resultPosition!: BlockCoordinates;
	public face!: number; // ZigZag
}
export @PacketId(0)
class HurtArmorPacket extends ProtocolPacket {
	public cause!: number; // ZigZag
	public damage!: number; // ZigZag
	public armorSlots!: bigint; // ZigZong
}
export @PacketId(0)
class SetEntityDataPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public metadata!: MetadataDictionary;
	public properties!: EntityProperties;
	public tick!: bigint; // VarLong
}
export @PacketId(0)
class SetEntityMotionPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public velocity!: Vector3; // Vector3f
}
export @PacketId(0)
class SetEntityLinkPacket extends ProtocolPacket {
	public link!: Link;
}
export @PacketId(0)
class SetHealthPacket extends ProtocolPacket {
	public health!: number; // ZigZag
}
export @PacketId(0)
class SetSpawnPositionPacket extends ProtocolPacket {
	public spawnType!: null;
	public playerPosition!: BlockCoordinates;
	public dimension!: number; // ZigZag
	public worldPosition!: BlockCoordinates;
}
export @PacketId(0)
class AnimatePacket extends ProtocolPacket {
	public actionId!: null;
	public runtimeEntityId!: bigint; // VarLong
}
export @PacketId(0)
class RespawnPacket extends ProtocolPacket {
	public position!: Vector3; // Vector3f
	public state!: number; // Byte
	public runtimeEntityId!: bigint; // VarLong
}
export @PacketId(0)
class ContainerOpenPacket extends ProtocolPacket {
	public windowId!: WindowID;
	public windowType!: WindowType;
	public coordinates!: BlockCoordinates;
	public runtimeEntityId!: bigint; // ZigZong
}
export @PacketId(0)
class ContainerClosePacket extends ProtocolPacket {
	public windowId!: WindowID;
	public server!: boolean; // Bool
}
export @PacketId(0)
class PlayerHotbarPacket extends ProtocolPacket {
	public selectedSlot!: number; // VarInt
	public windowId!: WindowID;
	public selectSlot!: boolean; // Bool
}
export @PacketId(0)
class InventoryContentPacket extends ProtocolPacket {
	public windowId!: WindowIDVarint;
	public input!: ItemStacks;
}
export @PacketId(0)
class InventorySlotPacket extends ProtocolPacket {
	public windowId!: WindowIDVarint;
	public slot!: number; // VarInt
	public item!: Item;
}
export @PacketId(0)
class ContainerSetDataPacket extends ProtocolPacket {
	public windowId!: WindowID;
	public property!: number; // ZigZag
	public value!: number; // ZigZag
}
export @PacketId(0)
class CraftingDataPacket extends ProtocolPacket {
	public recipes!: Recipes;
	public potionTypeRecipes!: PotionTypeRecipes;
	public potionContainerRecipes!: PotionContainerChangeRecipes;
	public materialReducers!: null;
	public clearRecipes!: boolean; // Bool
}
export @PacketId(0)
class CraftingEventPacket extends ProtocolPacket {
	public windowId!: WindowID;
	public recipeType!: null;
	public recipeId!: string; // UUID
	public input!: null;
	public result!: null;
}
export @PacketId(0)
class GuiDataPickItemPacket extends ProtocolPacket {
	public itemName!: string;
	public itemEffects!: string;
	public hotbarSlot!: number; // Int32
}
export @PacketId(0)
class AdventureSettingsPacket extends ProtocolPacket {
	public flags!: AdventureFlags;
	public commandPermission!: CommandPermissionLevelVarint;
	public actionPermissions!: ActionPermissions;
	public permissionLevel!: PermissionLevel;
	public customStoredPermissions!: number; // VarInt
	public userId!: bigint; // Int64
}
export @PacketId(0)
class BlockEntityDataPacket extends ProtocolPacket {
	public position!: BlockCoordinates;
	public nbt!: object; // LightNBT
}
export @PacketId(0)
class PlayerInputPacket extends ProtocolPacket {
	public motionX!: null; // lf32
	public motionZ!: null; // lf32
	public jumping!: boolean; // Bool
	public sneaking!: boolean; // Bool
}
export @PacketId(0)
class LevelChunkPacket extends ProtocolPacket {
	public x!: number; // ZigZag
	public z!: number; // ZigZag
	public dimension!: number; // ZigZag
	public subChunkCount!: number; // VarInt
	public highestSubchunkCount!: null;
	public cacheEnabled!: boolean; // Bool
	public blobs!: null;
	public payload!: Buffer; // VarBuffer
}
export @PacketId(0)
class SetCommandsEnabledPacket extends ProtocolPacket {
	public enabled!: boolean; // Bool
}
export @PacketId(0)
class SetDifficultyPacket extends ProtocolPacket {
	public difficulty!: number; // VarInt
}
export @PacketId(0)
class ChangeDimensionPacket extends ProtocolPacket {
	public dimension!: number; // ZigZag
	public position!: Vector3; // Vector3f
	public respawn!: boolean; // Bool
}
export @PacketId(0)
class SetPlayerGameTypePacket extends ProtocolPacket {
	public gamemode!: GameMode;
}
export @PacketId(0)
class PlayerListPacket extends ProtocolPacket {
	public records!: PlayerRecords;
}
export @PacketId(0)
class SimpleEventPacket extends ProtocolPacket {
	public eventType!: null;
}
export @PacketId(0)
class EventPacket extends ProtocolPacket {
	public runtimeId!: bigint; // VarLong
	public eventType!: null;
	public usePlayerId!: number; // Byte
	public eventData!: restBuffer;
}
export @PacketId(0)
class SpawnExperienceOrbPacket extends ProtocolPacket {
	public position!: Vector3; // Vector3f
	public count!: number; // ZigZag
}
export @PacketId(0)
class ClientboundMapItemDataPacket extends ProtocolPacket {
	public mapId!: bigint; // ZigZong
	public updateFlags!: UpdateMapFlags;
	public dimension!: number; // Byte
	public locked!: boolean; // Bool
	public origin!: Vector3; // ZigZagVector3
	public includedIn!: null;
	public scale!: null;
	public tracked!: null;
	public texture!: null;
}
export @PacketId(0)
class MapInfoRequestPacket extends ProtocolPacket {
	public mapId!: bigint; // ZigZong
	public clientPixels!: null;
}
export @PacketId(0)
class RequestChunkRadiusPacket extends ProtocolPacket {
	public chunkRadius!: number; // ZigZag
	public maxRadius!: number; // Byte
}
export @PacketId(0)
class ChunkRadiusUpdatePacket extends ProtocolPacket {
	public chunkRadius!: number; // ZigZag
}
export @PacketId(0)
class ItemFrameDropItemPacket extends ProtocolPacket {
	public coordinates!: BlockCoordinates;
}
export @PacketId(0)
class GameRulesChangedPacket extends ProtocolPacket {
	public rules!: GameRules;
}
export @PacketId(0)
class CameraPacket extends ProtocolPacket {
	public cameraEntityUniqueId!: bigint; // ZigZong
	public targetPlayerUniqueId!: bigint; // ZigZong
}
export @PacketId(0)
class BossEventPacket extends ProtocolPacket {
	public bossEntityId!: bigint; // ZigZong
	public type!: null;
}
export @PacketId(0)
class ShowCreditsPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public status!: number; // ZigZag
}
export @PacketId(0)
class AvailableCommandsPacket extends ProtocolPacket {
	public valuesLen!: number; // VarInt
	public EnumType!: null;
	public enumValues!: null;
	public chainedSubcommandValues!: null;
	public suffixes!: null;
	public enums!: null;
	public chainedSubcommands!: null;
	public commandData!: null;
	public dynamicEnums!: null;
	public enumConstraints!: null;
}
export @PacketId(0)
class CommandRequestPacket extends ProtocolPacket {
	public command!: string;
	public origin!: CommandOrigin;
	public internal!: boolean; // Bool
	public version!: number; // VarInt
}
export @PacketId(0)
class CommandBlockUpdatePacket extends ProtocolPacket {
	public isBlock!: boolean; // Bool
	public command!: string;
	public lastOutput!: string;
	public name!: string;
	public shouldTrackOutput!: boolean; // Bool
	public tickDelay!: number; // Int32
	public executeOnFirstTick!: boolean; // Bool
}
export @PacketId(0)
class CommandOutputPacket extends ProtocolPacket {
	public origin!: CommandOrigin;
	public outputType!: null;
	public successCount!: number; // VarInt
	public output!: null;
	public dataSet!: null;
}
export @PacketId(0)
class UpdateTradePacket extends ProtocolPacket {
	public windowId!: WindowID;
	public windowType!: WindowType;
	public size!: number; // VarInt
	public tradeTier!: number; // VarInt
	public villagerUniqueId!: bigint; // VarLong
	public entityUniqueId!: bigint; // VarLong
	public displayName!: string;
	public newTradingUi!: boolean; // Bool
	public economicTrades!: boolean; // Bool
	public offers!: object; // LightNBT
}
export @PacketId(0)
class UpdateEquipmentPacket extends ProtocolPacket {
	public windowId!: WindowID;
	public windowType!: WindowType;
	public size!: number; // Byte
	public entityId!: bigint; // ZigZong
	public inventory!: object; // LightNBT
}
export @PacketId(0)
class ResourcePackDataInfoPacket extends ProtocolPacket {
	public packId!: string;
	public maxChunkSize!: number; // UInt32
	public chunkCount!: number; // UInt32
	public size!: bigint; // UInt64
	public hash!: Buffer; // VarBuffer
	public isPremium!: boolean; // Bool
	public packType!: null;
}
export @PacketId(0)
class ResourcePackChunkDataPacket extends ProtocolPacket {
	public packId!: string;
	public chunkIndex!: number; // UInt32
	public progress!: bigint; // UInt64
	public payload!: Buffer; // VarBuffer
}
export @PacketId(0)
class ResourcePackChunkRequestPacket extends ProtocolPacket {
	public packId!: string;
	public chunkIndex!: number; // UInt32
}
export @PacketId(0)
class TransferPacket extends ProtocolPacket {
	public serverAddress!: string;
	public port!: number; // UInt16
}
export @PacketId(0)
class PlaySoundPacket extends ProtocolPacket {
	public name!: string;
	public coordinates!: BlockCoordinates;
	public volume!: null; // lf32
	public pitch!: null; // lf32
}
export @PacketId(0)
class StopSoundPacket extends ProtocolPacket {
	public name!: string;
	public stopAll!: boolean; // Bool
}
export @PacketId(0)
class SetTitlePacket extends ProtocolPacket {
	public type!: null;
	public text!: string;
	public fadeInTime!: number; // ZigZag
	public stayTime!: number; // ZigZag
	public fadeOutTime!: number; // ZigZag
	public xuid!: string;
	public platformOnlineId!: string;
}
export @PacketId(0)
class AddBehaviorTreePacket extends ProtocolPacket {
	public behaviortree!: string;
}
export @PacketId(0)
class StructureBlockUpdatePacket extends ProtocolPacket {
	public position!: BlockCoordinates;
	public structureName!: string;
	public dataField!: string;
	public includePlayers!: boolean; // Bool
	public showBoundingBox!: boolean; // Bool
	public structureBlockType!: number; // ZigZag
	public settings!: StructureBlockSettings;
	public redstoneSaveMode!: number; // ZigZag
	public shouldTrigger!: boolean; // Bool
	public waterLogged!: boolean; // Bool
}
export @PacketId(0)
class ShowStoreOfferPacket extends ProtocolPacket {
	public offerId!: string;
	public redirectType!: null;
}
export @PacketId(0)
class PurchaseReceiptPacket extends ProtocolPacket {
	public receipts!: null;
}
export @PacketId(0)
class PlayerSkinPacket extends ProtocolPacket {
	public uuid!: string; // UUID
	public skin!: Skin;
	public skinName!: string;
	public oldSkinName!: string;
	public isVerified!: boolean; // Bool
}
export @PacketId(0)
class SubClientLoginPacket extends ProtocolPacket {
	public tokens!: null;
}
export @PacketId(0)
class InitiateWebSocketConnectionPacket extends ProtocolPacket {
	public server!: string;
}
export @PacketId(0)
class SetLastHurtByPacket extends ProtocolPacket {
	public entityType!: number; // VarInt
}
export @PacketId(0)
class BookEditPacket extends ProtocolPacket {
	public type!: null;
	public slot!: number; // Byte
}
export @PacketId(0)
class NpcRequestPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public requestType!: null;
	public command!: string;
	public actionType!: null;
	public sceneName!: string;
}
export @PacketId(0)
class PhotoTransferPacket extends ProtocolPacket {
	public imageName!: string;
	public imageData!: string;
	public bookId!: string;
	public photoType!: number; // Byte
	public sourceType!: number; // Byte
	public ownerEntityUniqueId!: bigint; // Int64
	public newPhotoName!: string;
}
export @PacketId(0)
class ModalFormRequestPacket extends ProtocolPacket {
	public formId!: number; // VarInt
	public data!: string;
}
export @PacketId(0)
class ModalFormResponsePacket extends ProtocolPacket {
	public formId!: number; // VarInt
	public hasResponseData!: boolean; // Bool
	public data!: null;
	public hasCancelReason!: boolean; // Bool
}
export @PacketId(0)
class ServerSettingsRequestPacket extends ProtocolPacket {
}
export @PacketId(0)
class ServerSettingsResponsePacket extends ProtocolPacket {
	public formId!: number; // VarInt
	public data!: string;
}
export @PacketId(0)
class ShowProfilePacket extends ProtocolPacket {
	public xuid!: string;
}
export @PacketId(0)
class SetDefaultGameTypePacket extends ProtocolPacket {
	public gamemode!: GameMode;
}
export @PacketId(0)
class RemoveObjectivePacket extends ProtocolPacket {
	public objectiveName!: string;
}
export @PacketId(0)
class SetDisplayObjectivePacket extends ProtocolPacket {
	public displaySlot!: string;
	public objectiveName!: string;
	public displayName!: string;
	public criteriaName!: string;
	public sortOrder!: number; // ZigZag
}
export @PacketId(0)
class SetScorePacket extends ProtocolPacket {
	public action!: null;
	public entries!: null;
}
export @PacketId(0)
class LabTablePacket extends ProtocolPacket {
	public actionType!: null;
	public position!: Vector3; // ZigZagVector3
	public reactionType!: number; // Byte
}
export @PacketId(0)
class UpdateBlockSyncedPacket extends ProtocolPacket {
	public position!: BlockCoordinates;
	public blockRuntimeId!: number; // VarInt
	public flags!: UpdateBlockFlags;
	public layer!: number; // VarInt
	public entityUniqueId!: bigint; // ZigZong
	public transitionType!: null;
}
export @PacketId(0)
class MoveEntityDeltaPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
	public flags!: DeltaMoveFlags;
	public x!: null;
	public y!: null;
	public z!: null;
	public rotX!: null;
	public rotY!: null;
	public rotZ!: null;
}
export @PacketId(0)
class SetScoreboardIdentityPacket extends ProtocolPacket {
	public action!: null;
	public entries!: null;
}
export @PacketId(0)
class SetLocalPlayerAsInitializedPacket extends ProtocolPacket {
	public runtimeEntityId!: bigint; // VarLong
}
export @PacketId(0)
class UpdateSoftEnumPacket extends ProtocolPacket {
	public enumType!: string;
	public options!: null;
	public actionType!: null;
}
export @PacketId(0)
class NetworkStackLatencyPacket extends ProtocolPacket {
	public timestamp!: bigint; // UInt64
	public needsResponse!: number; // Byte
}
export @PacketId(0)
class ScriptCustomEventPacket extends ProtocolPacket {
	public eventName!: string;
	public eventData!: string;
}
export @PacketId(0)
class SpawnParticleEffectPacket extends ProtocolPacket {
	public dimension!: number; // Byte
	public entityId!: bigint; // ZigZong
	public position!: Vector3; // Vector3f
	public particleName!: string;
	public molangVariables!: Buffer; // VarBuffer
}
export @PacketId(0)
class AvailableEntityIdentifiersPacket extends ProtocolPacket {
	public nbt!: object; // LightNBT
}
export @PacketId(0)
class LevelSoundEventV2Packet extends ProtocolPacket {
	public soundId!: number; // Byte
	public position!: Vector3; // Vector3f
	public blockId!: number; // ZigZag
	public entityType!: string;
	public isBabyMob!: boolean; // Bool
	public isGlobal!: boolean; // Bool
}
export @PacketId(0)
class NetworkChunkPublisherUpdatePacket extends ProtocolPacket {
	public coordinates!: BlockCoordinates;
	public radius!: number; // VarInt
	public savedChunks!: null;
}
export @PacketId(0)
class BiomeDefinitionListPacket extends ProtocolPacket {
	public nbt!: object; // LightNBT
}
export @PacketId(0)
class LevelSoundEventPacket extends ProtocolPacket {
	public soundId!: SoundType;
	public position!: Vector3; // Vector3f
	public extraData!: number; // ZigZag
	public entityType!: string;
	public isBabyMob!: boolean; // Bool
	public isGlobal!: boolean; // Bool
}
export @PacketId(0)
class LevelEventGenericPacket extends ProtocolPacket {
	public eventId!: number; // VarInt
	public nbt!: nbtLoop;
}
export @PacketId(0)
class LecternUpdatePacket extends ProtocolPacket {
	public page!: number; // Byte
	public pageCount!: number; // Byte
	public position!: Vector3; // ZigZagVector3
	public dropBook!: boolean; // Bool
}
export @PacketId(0)
class VideoStreamConnectPacket extends ProtocolPacket {
	public serverUri!: string;
	public frameSendFrequency!: null; // lf32
	public action!: null;
	public resolutionX!: number; // Int32
	public resolutionY!: number; // Int32
}
export @PacketId(0)
class ClientCacheStatusPacket extends ProtocolPacket {
	public enabled!: boolean; // Bool
}
export @PacketId(0)
class OnScreenTextureAnimationPacket extends ProtocolPacket {
	public animationType!: number; // UInt32
}
export @PacketId(0)
class MapCreateLockedCopyPacket extends ProtocolPacket {
	public originalMapId!: bigint; // ZigZong
	public newMapId!: bigint; // ZigZong
}
export @PacketId(0)
class StructureTemplateDataExportRequestPacket extends ProtocolPacket {
	public name!: string;
	public position!: BlockCoordinates;
	public settings!: StructureBlockSettings;
	public requestType!: null;
}
export @PacketId(0)
class StructureTemplateDataExportResponsePacket extends ProtocolPacket {
	public name!: string;
	public success!: boolean; // Bool
	public nbt!: null;
	public responseType!: null;
}
export @PacketId(0)
class UpdateBlockPropertiesPacket extends ProtocolPacket {
	public nbt!: object; // LightNBT
}
export @PacketId(0)
class ClientCacheBlobStatusPacket extends ProtocolPacket {
	public misses!: number; // VarInt
	public haves!: number; // VarInt
	public missing!: null;
	public have!: null;
}
export @PacketId(0)
class ClientCacheMissResponsePacket extends ProtocolPacket {
	public blobs!: null;
}
export @PacketId(0)
class EducationSettingsPacket extends ProtocolPacket {
	public CodeBuilderDefaultURI!: string;
	public CodeBuilderTitle!: string;
	public CanResizeCodeBuilder!: boolean; // Bool
	public disableLegacyTitleBar!: boolean; // Bool
	public postProcessFilter!: string;
	public screenshotBorderPath!: string;
	public hasAgentCapabilities!: boolean; // Bool
	public agentCapabilities!: null;
	public HasOverrideURI!: boolean; // Bool
	public OverrideURI!: null;
	public HasQuiz!: boolean; // Bool
	public hasExternalLinkSettings!: boolean; // Bool
	public externalLinkSettings!: null;
}
export @PacketId(0)
class EmotePacket extends ProtocolPacket {
	public entityId!: bigint; // VarLong
	public emoteId!: string;
	public xuid!: string;
	public platformId!: string;
	public flags!: null;
}
export @PacketId(0)
class MultiplayerSettingsPacket extends ProtocolPacket {
	public actionType!: null;
}
export @PacketId(0)
class SettingsCommandPacket extends ProtocolPacket {
	public commandLine!: string;
	public suppressOutput!: boolean; // Bool
}
export @PacketId(0)
class AnvilDamagePacket extends ProtocolPacket {
	public damage!: number; // Byte
	public position!: BlockCoordinates;
}
export @PacketId(0)
class CompletedUsingItemPacket extends ProtocolPacket {
	public usedItemId!: number; // Int16
	public useMethod!: null;
}
export @PacketId(0)
class NetworkSettingsPacket extends ProtocolPacket {
	public compressionThreshold!: number; // UInt16
	public compressionAlgorithm!: null;
	public clientThrottle!: boolean; // Bool
	public clientThrottleThreshold!: number; // Byte
	public clientThrottleScalar!: null; // lf32
}
export @PacketId(0)
class PlayerAuthInputPacket extends ProtocolPacket {
	public pitch!: null; // lf32
	public yaw!: null; // lf32
	public position!: Vector3; // Vector3f
	public moveVector!: vec2f;
	public headYaw!: null; // lf32
	public inputData!: InputFlag;
	public inputMode!: null;
	public playMode!: null;
	public interactionModel!: null;
	public gazeDirection!: null;
	public tick!: bigint; // VarLong
	public delta!: Vector3; // Vector3f
	public transaction!: null;
	public itemStackRequest!: null;
	public predictedVehicle!: null;
	public blockAction!: null;
	public analogueMoveVector!: vec2f;
}
export @PacketId(0)
class CreativeContentPacket extends ProtocolPacket {
	public items!: null;
}
export @PacketId(0)
class PlayerEnchantOptionsPacket extends ProtocolPacket {
	public options!: null;
}
export @PacketId(0)
class ItemStackRequestPacket extends ProtocolPacket {
	public requests!: null;
}
export @PacketId(0)
class ItemStackResponsePacket extends ProtocolPacket {
	public responses!: ItemStackResponses;
}
export @PacketId(0)
class PlayerArmorDamagePacket extends ProtocolPacket {
	public type!: ArmorDamageType;
	public helmetDamage!: null;
	public chestplateDamage!: null;
	public leggingsDamage!: null;
	public bootsDamage!: null;
}
export @PacketId(0)
class UpdatePlayerGameTypePacket extends ProtocolPacket {
	public gamemode!: GameMode;
	public playerUniqueId!: bigint; // ZigZong
}
export @PacketId(0)
class EmoteListPacket extends ProtocolPacket {
	public playerId!: bigint; // VarLong
	public emotePieces!: null;
}
export @PacketId(0)
class PositionTrackingDbRequestPacket extends ProtocolPacket {
	public action!: null;
	public trackingId!: number; // ZigZag
}
export @PacketId(0)
class PositionTrackingDbBroadcastPacket extends ProtocolPacket {
	public broadcastAction!: null;
	public trackingId!: number; // ZigZag
	public nbt!: object; // LightNBT
}
export @PacketId(0)
class PacketViolationWarningPacket extends ProtocolPacket {
	public violationType!: null;
	public severity!: null;
	public thePacketId!: number; // ZigZag
	public reason!: string;
}
export @PacketId(0)
class MotionPredictionHintsPacket extends ProtocolPacket {
	public entityRuntimeId!: bigint; // VarLong
	public velocity!: Vector3; // Vector3f
	public onGround!: boolean; // Bool
}
export @PacketId(0)
class AnimateEntityPacket extends ProtocolPacket {
	public animation!: string;
	public nextState!: string;
	public stopCondition!: string;
	public stopConditionVersion!: number; // Int32
	public controller!: string;
	public blendOutTime!: null; // lf32
	public runtimeEntityIds!: null;
}
export @PacketId(0)
class CameraShakePacket extends ProtocolPacket {
	public intensity!: null; // lf32
	public duration!: null; // lf32
	public type!: number; // Byte
	public action!: null;
}
export @PacketId(0)
class PlayerFogPacket extends ProtocolPacket {
	public stack!: null;
}
export @PacketId(0)
class CorrectPlayerMovePredictionPacket extends ProtocolPacket {
	public position!: Vector3; // Vector3f
	public delta!: Vector3; // Vector3f
	public onGround!: boolean; // Bool
	public tick!: bigint; // VarLong
}
export @PacketId(0)
class ItemComponentPacket extends ProtocolPacket {
	public entries!: ItemComponentList;
}
export @PacketId(0)
class FilterTextPacketPacket extends ProtocolPacket {
	public text!: string;
	public fromServer!: boolean; // Bool
}
export @PacketId(0)
class DebugRendererPacket extends ProtocolPacket {
	public type!: null;
}
export @PacketId(0)
class SyncEntityPropertyPacket extends ProtocolPacket {
	public nbt!: object; // LightNBT
}
export @PacketId(0)
class AddVolumeEntityPacket extends ProtocolPacket {
	public runtimeId!: bigint; // VarLong
	public nbt!: object; // LightNBT
	public encodingIdentifier!: string;
	public instanceName!: string;
	public bounds!: null;
	public dimension!: number; // ZigZag
	public engineVersion!: string;
}
export @PacketId(0)
class RemoveVolumeEntityPacket extends ProtocolPacket {
	public entityId!: bigint; // VarLong
}
export @PacketId(0)
class SimulationTypePacket extends ProtocolPacket {
	public type!: null;
}
export @PacketId(0)
class NpcDialoguePacket extends ProtocolPacket {
	public entityId!: bigint; // UInt64
	public actionType!: null;
	public dialogue!: string;
	public screenName!: string;
	public npcName!: string;
	public actionJson!: string;
}
export @PacketId(0)
class EduUriResourcePacketPacket extends ProtocolPacket {
	public resource!: EducationSharedResourceURI;
}
export @PacketId(0)
class CreatePhotoPacket extends ProtocolPacket {
	public entityUniqueId!: bigint; // Int64
	public photoName!: string;
	public itemName!: string;
}
export @PacketId(0)
class UpdateSubchunkBlocksPacket extends ProtocolPacket {
	public x!: number; // ZigZag
	public y!: number; // ZigZag
	public z!: number; // ZigZag
	public blocks!: null;
	public extra!: null;
}
export @PacketId(0)
class PhotoInfoRequestPacket extends ProtocolPacket {
	public photoId!: bigint; // ZigZong
}
// Complex Array: SubChunkEntryWithoutCaching

// Complex Array: SubChunkEntryWithCaching

export @PacketId(0)
class SubchunkPacket extends ProtocolPacket {
	public cacheEnabled!: boolean; // Bool
	public dimension!: number; // ZigZag
	public origin!: Vector3; // ZigZagVector3
	public entries!: null;
}
export @PacketId(0)
class SubchunkRequestPacket extends ProtocolPacket {
	public dimension!: number; // ZigZag
	public origin!: Vector3; // ZigZagVector3
	public requests!: null;
}
export @PacketId(0)
class ClientStartItemCooldownPacket extends ProtocolPacket {
	public category!: string;
	public duration!: number; // ZigZag
}
export @PacketId(0)
class ScriptMessagePacket extends ProtocolPacket {
	public messageId!: string;
	public data!: string;
}
export @PacketId(0)
class CodeBuilderSourcePacket extends ProtocolPacket {
	public operation!: null;
	public category!: null;
	public value!: string;
}
export @PacketId(0)
class TickingAreasLoadStatusPacket extends ProtocolPacket {
	public preload!: boolean; // Bool
}
export @PacketId(0)
class DimensionDataPacket extends ProtocolPacket {
	public definitions!: null;
}
export @PacketId(0)
class AgentActionPacket extends ProtocolPacket {
	public requestId!: string;
	public actionType!: null;
	public body!: string;
}
export @PacketId(0)
class ChangeMobPropertyPacket extends ProtocolPacket {
	public entityUniqueId!: bigint; // ZigZong
	public property!: string;
	public boolValue!: boolean; // Bool
	public stringValue!: string;
	public intValue!: number; // ZigZag
	public floatValue!: null; // lf32
}
export @PacketId(0)
class LessonProgressPacket extends ProtocolPacket {
	public action!: number; // Byte
	public score!: number; // ZigZag
	public identifier!: string;
}
export @PacketId(0)
class RequestAbilityPacket extends ProtocolPacket {
	public ability!: null;
	public valueType!: null;
	public boolValue!: boolean; // Bool
	public floatVal!: null; // lf32
}
export @PacketId(0)
class RequestPermissionsPacket extends ProtocolPacket {
	public entityUniqueId!: bigint; // Int64
	public permissionLevel!: PermissionLevel;
	public requestedPermissions!: RequestPermissions;
}
export @PacketId(0)
class ToastRequestPacket extends ProtocolPacket {
	public title!: string;
	public message!: string;
}
export @PacketId(0)
class UpdateAbilitiesPacket extends ProtocolPacket {
	public entityUniqueId!: bigint; // Int64
	public permissionLevel!: PermissionLevel;
	public commandPermission!: CommandPermissionLevel;
	public abilities!: null;
}
export @PacketId(0)
class UpdateAdventureSettingsPacket extends ProtocolPacket {
	public noPvm!: boolean; // Bool
	public noMvp!: boolean; // Bool
	public immutableWorld!: boolean; // Bool
	public showNameTags!: boolean; // Bool
	public autoJump!: boolean; // Bool
}
export @PacketId(0)
class DeathInfoPacket extends ProtocolPacket {
	public cause!: string;
	public messages!: null;
}
export @PacketId(0)
class EditorNetworkPacket extends ProtocolPacket {
	public payload!: object; // LightNBT
}
export @PacketId(0)
class FeatureRegistryPacket extends ProtocolPacket {
	public features!: null;
}
export @PacketId(0)
class ServerStatsPacket extends ProtocolPacket {
	public serverTime!: null; // lf32
	public networkTime!: null; // lf32
}
export @PacketId(0)
class RequestNetworkSettingsPacket extends ProtocolPacket {
	public clientProtocol!: null; // i32
}
export @PacketId(0)
class GameTestRequestPacket extends ProtocolPacket {
	public maxTestsPerBatch!: number; // VarInt
	public repetitions!: number; // VarInt
	public rotation!: null;
	public stopOnError!: boolean; // Bool
	public position!: BlockCoordinates;
	public testsPerRow!: number; // VarInt
	public name!: string;
}
export @PacketId(0)
class GameTestResultsPacket extends ProtocolPacket {
	public succeeded!: boolean; // Bool
	public error!: string;
	public name!: string;
}
export @PacketId(0)
class UpdateClientInputLocksPacket extends ProtocolPacket {
	public locks!: InputLockFlags;
	public position!: Vector3; // Vector3f
}
export @PacketId(0)
class ClientCheatAbilityPacket extends ProtocolPacket {
	public entityUniqueId!: bigint; // Int64
	public permissionLevel!: PermissionLevel;
	public commandPermission!: CommandPermissionLevel;
	public abilities!: null;
}
export @PacketId(0)
class CameraPresetsPacket extends ProtocolPacket {
	public presets!: null;
}
export @PacketId(0)
class UnlockedRecipesPacket extends ProtocolPacket {
	public unlockType!: null;
	public recipes!: null;
}
export @PacketId(0)
class CameraInstructionPacket extends ProtocolPacket {
	public instructionSet!: null;
	public clear!: null;
	public fade!: null;
}
export @PacketId(0)
class CompressedBiomeDefinitionsPacket extends ProtocolPacket {
	public rawPayload!: string;
}
export @PacketId(0)
class TrimDataPacket extends ProtocolPacket {
	public patterns!: null;
	public materials!: null;
}
export @PacketId(0)
class OpenSignPacket extends ProtocolPacket {
	public position!: BlockCoordinates;
	public isFront!: boolean; // Bool
}
export @PacketId(0)
class AgentAnimationPacket extends ProtocolPacket {
	public animation!: null;
	public entityRuntimeId!: bigint; // VarLong
}
export @PacketId(0)
class RefreshEntitlementsPacket extends ProtocolPacket {
}
export @PacketId(0)
class ToggleCrafterSlotRequestPacket extends ProtocolPacket {
	public position!: Vector3; // Vector3i
	public slot!: number; // Byte
	public disabled!: boolean; // Bool
}
export @PacketId(0)
class SetPlayerInventoryOptionsPacket extends ProtocolPacket {
	public leftTab!: null;
	public rightTab!: null;
	public filtering!: boolean; // Bool
	public layout!: null;
	public craftingLayout!: null;
}
export @PacketId(0)
class SetHudPacket extends ProtocolPacket {
	public elements!: null;
	public visibility!: null;
}
export enum Element{
	PaperDoll=0,
	Armour=1,
	ToolTips=2,
	TouchControls=3,
	Crosshair=4,
	HotBar=5,
	Health=6,
	ProgressBar=7,
	Hunger=8,
	AirBubbles=9,
	HourseHealth=10,
}

export @PacketId(0)
class ServerPostMovePacket extends ProtocolPacket {
	public position!: Vector3; // Vector3f
}
