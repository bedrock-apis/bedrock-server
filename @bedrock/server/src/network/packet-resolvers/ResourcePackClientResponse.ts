import { PacketIds } from "@bedrock/base";
import {
	DisconnectReason,
	PlayStatusPacket,
	PlayerStatus,
	ResourcePackStackPacket,
	ResourceStatus,
} from "@bedrock/protocol";
import { ConstructPlayer } from "../../minecraft/players/player.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.ResourcePackClientResponse] = async (client, packet) => {
	switch (packet.status) {
		case ResourceStatus.None:
		case ResourceStatus.Refused:
		case ResourceStatus.SendPacks:
			throw new Error("ResourceStatus.SendPacks is not implemented!");
		case ResourceStatus.HaveAllPacks: {
			const stack = new ResourcePackStackPacket();
			stack.gameVersion = "0.0.0.0";
			client.post([stack]);
			break;
		}

		case ResourceStatus.Completed: {
			console.log("start game packet");
			const defaultDimension = client.engine.world.getDefualtDimension();
			if (!defaultDimension) return client.disconnect("No dimension available to spawn", DisconnectReason.Unknown);
			const player = ConstructPlayer(defaultDimension, client);
			client.player = player;
			const startGamePacket = player.world.buildStartGamePacket(player);
			client.post([startGamePacket,PlayStatusPacket.From(PlayerStatus.PlayerSpawn)]);

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
