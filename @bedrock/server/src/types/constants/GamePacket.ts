import { Vec3 } from "@bedrock/base";
import { Difficulty, GameInitializePacket, GameMode, PermissionLevel } from "@bedrock/protocol";

export const defualtGameInitializePacket = new GameInitializePacket();
defualtGameInitializePacket.seed = 0n;
defualtGameInitializePacket.biomeType = 0;
defualtGameInitializePacket.biomeName = "plains";
defualtGameInitializePacket.dimension = 0;
defualtGameInitializePacket.generator = 1;
defualtGameInitializePacket.worldGamemode = GameMode.Creative;
defualtGameInitializePacket.difficulty = Difficulty.Normal;
defualtGameInitializePacket.spawnPosition = new Vec3();
defualtGameInitializePacket.achievementsDisabled = false;
defualtGameInitializePacket.editorWorldType = 0;
defualtGameInitializePacket.createdInEdior = false;
defualtGameInitializePacket.exportedFromEdior = false;
defualtGameInitializePacket.dayCycleStopTime = 8_250;
defualtGameInitializePacket.eduOffer = 0;
defualtGameInitializePacket.eduFeatures = false;
defualtGameInitializePacket.eduProductUuid = "";
defualtGameInitializePacket.rainLevel = 0;
defualtGameInitializePacket.lightningLevel = 0;
defualtGameInitializePacket.confirmedPlatformLockedContent = false;
defualtGameInitializePacket.multiplayerGame = true;
defualtGameInitializePacket.broadcastToLan = true;
defualtGameInitializePacket.xblBroadcastMode = 6;
defualtGameInitializePacket.platformBroadcastMode = 6;
defualtGameInitializePacket.commandsEnabled = true;
defualtGameInitializePacket.texturePacksRequired = false;
defualtGameInitializePacket.gamerules = [];
defualtGameInitializePacket.experiments = [];
defualtGameInitializePacket.experimentsPreviouslyToggled = false;
defualtGameInitializePacket.bonusChest = false;
defualtGameInitializePacket.mapEnabled = false;
defualtGameInitializePacket.permissionLevel = PermissionLevel.Member;
defualtGameInitializePacket.serverChunkTickRange = 4;
defualtGameInitializePacket.hasLockedBehaviorPack = false;
defualtGameInitializePacket.hasLockedResourcePack = false;
defualtGameInitializePacket.isFromLockedWorldTemplate = false;
defualtGameInitializePacket.useMsaGamertagsOnly = false;
defualtGameInitializePacket.isFromWorldTemplate = false;
defualtGameInitializePacket.isWorldTemplateOptionLocked = false;
defualtGameInitializePacket.onlySpawnV1Villagers = false;
defualtGameInitializePacket.personaDisabled = false;
defualtGameInitializePacket.customSkinsDisabled = false;
defualtGameInitializePacket.emoteChatMuted = false;
defualtGameInitializePacket.gameVersion = "*";
defualtGameInitializePacket.limitedWorldWidth = 16;
defualtGameInitializePacket.limitedWorldLength = 16;
defualtGameInitializePacket.isNewNether = false;
defualtGameInitializePacket.eduResourceUriButtonName = "";
defualtGameInitializePacket.eduResourceUriLink = "";
defualtGameInitializePacket.experimentalGameplayOverride = false;
defualtGameInitializePacket.chatRestrictionLevel = 0;
defualtGameInitializePacket.disablePlayerInteractions = false;
defualtGameInitializePacket.levelId = "level";
defualtGameInitializePacket.worldName = "Server Name";
defualtGameInitializePacket.premiumWorldTemplateId = "00000000-0000-0000-0000-000000000000";
defualtGameInitializePacket.isTrial = false;
defualtGameInitializePacket.movementAuthority = 0;
defualtGameInitializePacket.rewindHistorySize = 40;
defualtGameInitializePacket.serverAuthoritativeBlockBreaking = false;
defualtGameInitializePacket.currentTick = 0n;
defualtGameInitializePacket.enchantmentSeed = 0;
defualtGameInitializePacket.blockProperties = [];
defualtGameInitializePacket.itemStates = [];
defualtGameInitializePacket.multiplayerCorrelationId = "<raknet>a555-7ece-2f1c-8f69";
defualtGameInitializePacket.serverAuthoritativeInventory = true;
defualtGameInitializePacket.engine = "*";
defualtGameInitializePacket.blockPaletteChecksum = 0n;
defualtGameInitializePacket.worldTemplateId = "00000000000000000000000000000000";
defualtGameInitializePacket.clientSideGeneration = false;
defualtGameInitializePacket.blockNetworkIdsAreHashes = false; // Important
defualtGameInitializePacket.serverControlledSounds = false;
