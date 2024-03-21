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
} from "@bedrock/base";
import type { ExperimentLike, GameRuleLike, ItemStateLike } from "../types/index.js";
import {
	BlockCoordinates,
	BlockProperty,
	Difficulty,
	Experiment,
	GameMode,
	GameRule,
	ItemState,
	PermissionLevel,
} from "../types/index.js";

@PacketId(PacketIds.StartGame)
export class GameInitializePacket extends ProtocolPacket {
	@SerializeAs(ZigZong) public entityId!: bigint;
	@SerializeAs(VarLong) public runtimeEntityId!: bigint;
	@SerializeAs(ZigZag) public playerGamemode!: GameMode;
	@SerializeAs(Vector3f) public playerPosition!: Vector3;
	@SerializeAs(Vector2f) public rotation!: Vector2;
	@SerializeAs(Int64, Endianness.Little) public seed!: bigint;
	@SerializeAs(Int16, Endianness.Little) public biomeType!: number;
	@SerializeAs(VarString) public biomeName!: string;
	@SerializeAs(ZigZag) public dimension!: number;
	@SerializeAs(ZigZag) public generator!: number;
	@SerializeAs(ZigZag) public worldGamemode!: GameMode;
	@SerializeAs(ZigZag) public difficulty!: Difficulty;
	@SerializeAs(BlockCoordinates) public spawnPosition!: Vector3;
	@SerializeAs(Bool) public achievementsDisabled!: boolean;
	@SerializeAs(ZigZag) public editorWorldType!: number;
	@SerializeAs(Bool) public createdInEdior!: boolean;
	@SerializeAs(Bool) public exportedFromEdior!: boolean;
	@SerializeAs(ZigZag) public dayCycleStopTime!: number;
	@SerializeAs(ZigZag) public eduOffer!: number;
	@SerializeAs(Bool) public eduFeatures!: boolean;
	@SerializeAs(VarString) public eduProductUuid!: string;
	@SerializeAs(Float, Endianness.Little) public rainLevel!: number;
	@SerializeAs(Float, Endianness.Little) public lightningLevel!: number;
	@SerializeAs(Bool) public confirmedPlatformLockedContent!: boolean;
	@SerializeAs(Bool) public multiplayerGame!: boolean;
	@SerializeAs(Bool) public broadcastToLan!: boolean;
	@SerializeAs(VarInt) public xblBroadcastMode!: number;
	@SerializeAs(VarInt) public platformBroadcastMode!: number;
	@SerializeAs(Bool) public commandsEnabled!: boolean;
	@SerializeAs(Bool) public texturePacksRequired!: boolean;
	@SerializeAs(GameRule) @AsList(VarInt) public gamerules!: GameRuleLike[];
	@SerializeAs(Experiment) @AsList(Int32, Endianness.Little) public experiments!: ExperimentLike[];
	@SerializeAs(Bool) public experimentsPreviouslyToggled!: boolean;
	@SerializeAs(Bool) public bonusChest!: boolean;
	@SerializeAs(Bool) public mapEnabled!: boolean;
	@SerializeAs(Byte) public permissionLevel!: PermissionLevel;
	@SerializeAs(Int32, Endianness.Little) public serverChunkTickRange!: number;
	@SerializeAs(Bool) public hasLockedBehaviorPack!: boolean;
	@SerializeAs(Bool) public hasLockedResourcePack!: boolean;
	@SerializeAs(Bool) public isFromLockedWorldTemplate!: boolean;
	@SerializeAs(Bool) public useMsaGamertagsOnly!: boolean;
	@SerializeAs(Bool) public isFromWorldTemplate!: boolean;
	@SerializeAs(Bool) public isWorldTemplateOptionLocked!: boolean;
	@SerializeAs(Bool) public onlySpawnV1Villagers!: boolean;
	@SerializeAs(Bool) public personaDisabled!: boolean;
	@SerializeAs(Bool) public customSkinsDisabled!: boolean;
	@SerializeAs(Bool) public emoteChatMuted!: boolean;
	@SerializeAs(VarString) public gameVersion!: string;
	@SerializeAs(Int32, Endianness.Little) public limitedWorldWidth!: number;
	@SerializeAs(Int32, Endianness.Little) public limitedWorldLength!: number;
	@SerializeAs(Bool) public isNewNether!: boolean;
	@SerializeAs(VarString) public eduResourceUriButtonName!: string;
	@SerializeAs(VarString) public eduResourceUriLink!: string;
	@SerializeAs(Bool) public experimentalGameplayOverride!: boolean;
	@SerializeAs(Byte) public chatRestrictionLevel!: number;
	@SerializeAs(Bool) public disablePlayerInteractions!: boolean;
	@SerializeAs(VarString) public levelId!: string;
	@SerializeAs(VarString) public worldName!: string;
	@SerializeAs(VarString) public premiumWorldTemplateId!: string;
	@SerializeAs(Bool) public isTrial!: boolean;
	@SerializeAs(ZigZag) public movementAuthority!: number;
	@SerializeAs(ZigZag) public rewindHistorySize!: number;
	@SerializeAs(Bool) public serverAuthoritativeBlockBreaking!: boolean;
	@SerializeAs(Int64, Endianness.Little) public currentTick!: bigint;
	@SerializeAs(ZigZag) public enchantmentSeed!: number;
	@SerializeAs(BlockProperty) @AsList(VarInt) public blockProperties!: BlockProperty[];
	@SerializeAs(ItemState) @AsList(VarInt) public itemStates!: ItemStateLike[];
	@SerializeAs(VarString) public multiplayerCorrelationId!: string;
	@SerializeAs(Bool) public serverAuthoritativeInventory!: boolean;
	@SerializeAs(VarString) public engine!: string;
	@SerializeAs(LRootTag) public nbtProperties: any = {};
	@SerializeAs(Int64, Endianness.Little) public blockPaletteChecksum!: bigint;
	@SerializeAs(UUID) public worldTemplateId: string = "00000000-0000-0000-0000-000000000000";
	@SerializeAs(Bool) public clientSideGeneration!: boolean;
	@SerializeAs(Bool) public blockNetworkIdsAreHashes!: boolean;
	@SerializeAs(Bool) public serverControlledSounds!: boolean;
}
