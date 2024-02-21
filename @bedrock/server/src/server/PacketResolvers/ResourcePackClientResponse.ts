import { BinaryStream } from "@bedrock/base";
import { ClientData, HostMessageType } from "../../communcation";
import { Player } from "../../minecraft";
import { AbilityLayer, BlockCoordinates, GameInitializePacket, PacketIds, PlayStatusPacket, PlayerAttribute, ResourcePackStackPacket, UpdateAttributesPacket, UpdateEntityDataPacket, WorldGameRules } from "../../protocol";
import { Abilities, AttributeComponentIds, CommandPermissionLevel, DEFAULT_ATTRIBUTES, Difficulty, GameMode, MetadataFlags, MetadataKey, MetadataType, PermissionLevel, PlayerStatus, ResourceStatus } from "../../types";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.ResourcePackClientResponse] = async (client, packet) => {		
	switch (packet.status) {
	case ResourceStatus.None: 
	case ResourceStatus.Refused:
	case ResourceStatus.SendPacks:
		throw new Error("ResourceStatus.SendPacks is not implemented!");
	case ResourceStatus.HaveAllPacks: {
		const stack = new ResourcePackStackPacket();
		stack.gameVersion = "0.0.0.0";
		client.post(stack);
		break;
	}

	case ResourceStatus.Completed: {
		const start = new GameInitializePacket();
		start.entityId = client.entityId;
		start.runtimeEntityId = client.runtimeId;
		start.playerGamemode = client.initData.gamemode;
		start.playerPosition = client.initData.location;
		start.rotation = client.initData.rotation;
		start.seed = 0n;
		start.biomeType = 0;
		start.biomeName = "plains";
		start.dimension = 0;
		start.generator = 1;
		start.worldGamemode = GameMode.Creative;
		start.difficulty = Difficulty.Normal;
		start.spawnPosition = new BlockCoordinates();
		start.achievementsDisabled = false;
		start.editorWorldType = 0;
		start.createdInEdior = false;
		start.exportedFromEdior = false;
		start.dayCycleStopTime = 8_250;
		start.eduOffer = 0;
		start.eduFeatures = false;
		start.eduProductUuid = "";
		start.rainLevel = 0;
		start.lightningLevel = 0;
		start.confirmedPlatformLockedContent = false;
		start.multiplayerGame = true;
		start.broadcastToLan = true;
		start.xblBroadcastMode = 6;
		start.platformBroadcastMode = 6;
		start.commandsEnabled = true;
		start.texturePacksRequired = false;
		start.gamerules = new WorldGameRules().setGameRule("showdeathmessages", true).setGameRule("showcoordinates", true);
		start.experiments = [];
		start.experimentsPreviouslyToggled = false;
		start.bonusChest = false;
		start.mapEnabled = false;
		start.permissionLevel = PermissionLevel.Member;
		start.serverChunkTickRange = 4;
		start.hasLockedBehaviorPack = false;
		start.hasLockedResourcePack = false;
		start.isFromLockedWorldTemplate = false;
		start.useMsaGamertagsOnly = false;
		start.isFromWorldTemplate = false;
		start.isWorldTemplateOptionLocked = false;
		start.onlySpawnV1Villagers = false;
		start.personaDisabled = false;
		start.customSkinsDisabled = false;
		start.emoteChatMuted = false;
		start.gameVersion = "*";
		start.limitedWorldWidth = 16;
		start.limitedWorldLength = 16;
		start.isNewNether = false;
		start.eduResourceUriButtonName = "";
		start.eduResourceUriLink = "";
		start.experimentalGameplayOverride = false;
		start.chatRestrictionLevel = 0;
		start.disablePlayerInteractions = false;
		start.levelId = "level";
		start.worldName = "Server Name";
		start.premiumWorldTemplateId = "00000000-0000-0000-0000-000000000000";
		start.isTrial = false;
		start.movementAuthority = 0;
		start.rewindHistorySize = 40;
		start.serverAuthoritativeBlockBreaking = false;
		start.currentTick = 0n;
		start.enchantmentSeed = 0;
		start.blockProperties = [];
		start.itemStates = [];
		start.multiplayerCorrelationId = "<raknet>a555-7ece-2f1c-8f69";
		start.serverAuthoritativeInventory = true;
		start.engine = "*";
		start.blockPaletteChecksum = 0n;
		start.worldTemplateId = "00000000000000000000000000000000";
		start.clientSideGeneration = true;
		start.blockNetworkIdsAreHashes = false; // Important
		start.serverControlledSounds = false;
		const status = new PlayStatusPacket();
		status.status = PlayerStatus.PlayerSpawn;
		client.post(start, status);
		client.port.Post(HostMessageType.PlayerSpawn, new ClientData(client.uuid));
		const attr = new UpdateAttributesPacket();
		attr.runtimeEntityId = client.runtimeId;
		attr.tick = 0n;
		attr.attributes = [
			AttributeComponentIds.Absorption,
			AttributeComponentIds.Luck,
			AttributeComponentIds.FallDamage,
			AttributeComponentIds.Health,
			AttributeComponentIds.KnockbackResistence,
			AttributeComponentIds.Movement,
			AttributeComponentIds.LavaMovement,
			AttributeComponentIds.UnderwaterMovement,
			AttributeComponentIds.AttackDamage,
			AttributeComponentIds.PlayerExhaustion,
			AttributeComponentIds.PlayerExperience,
			AttributeComponentIds.PlayerHunger,
			AttributeComponentIds.PlayerLevel,
			AttributeComponentIds.PlayerSaturation
		].map((e)=>{
			const s = new PlayerAttribute();
			Object.assign(s, DEFAULT_ATTRIBUTES[e]);
			s.modifiers = [];
			return s;
		});
		client.post(attr);
		const a = new UpdateEntityDataPacket();
		a.runtimeEntityId = client.runtimeId;
		a.tick = 0n;
		a.metadata = [
			{
				key: MetadataKey.Flags,
				type: MetadataType.Long,
				value: MetadataFlags.AffectedByGravity
			}
		];
		client.post(a);
		const s = new BinaryStream();
		a.Serialize(UpdateEntityDataPacket, s, a);
		console.log(s.getBuffer());
		
		/*
		const start = DefualtStartGamePacket();
		client.server.worldSettings.AssignToStartGamePacket(start);
		if(client.loginTask) await client.loginTask; // Wait required initialization for player
		client.information.AssignToStartGamePacket(start); 
        
		await client.send(start, client.server.creativeItems.GetCreativeInventoryPacket(), new BiomeDefinitionList());
		const tasks = [];
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				const chunk = new LevelChunk();
				chunk.x = x;
				chunk.z = z;
				chunk.subChunkCount = 0;
				chunk.cacheEnabled = false;
				chunk.data = Buffer.alloc(16 * 256 * 16);
				tasks.push(client.send(chunk));
			}
		}

		for await (const t of tasks);
        
		/*
        const minX = 0 - 4;
        const maxX = 0 + 4;
        const minZ = 0 - 4;
        const maxZ = 0 + 4;

        const sendQueue: ChunkColumn[] = [];
        for (let chunkX = minX; chunkX <= maxX; ++chunkX) {
            for (let chunkZ = minZ; chunkZ <= maxZ; ++chunkZ) {
                // TODO: vanilla does not send all of them, but in a range
                // for example it does send them from x => [-3; 3] and z => [-3; 2]
                sendQueue.push(generateFlatChunk(this.serenity, chunkX, chunkZ));
            }
        }

        // Map chunks into the publisher update
        const savedChunks: ChunkCoord[] = sendQueue.map((chunk) => {
            return { x: chunk.x, z: chunk.z };
        });

/*
        const radMul = 4;

        const update = new NetworkChunkPublisherUpdate();
        update.coordinate = { x: 0, y: 0, z: 0 };
        update.radius = radMul << 4;
        update.savedChunks = savedChunks;
        await session.send(update);

        for (const chunk of sendQueue) {
            await session.sendChunk(chunk);
        }
    */
	}
	}
};
