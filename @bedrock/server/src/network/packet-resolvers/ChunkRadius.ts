import { PacketIds } from "@bedrock/base";
import { ChunkRadiusUpdatePacket } from "@bedrock/protocol";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.RequestChunkRadius] = async (client, packet) => {
	const p = new ChunkRadiusUpdatePacket();
	p.chunkRadius = packet.chunkRadius;
	client.post([p]);
	client.player.viewDistance = packet.chunkRadius;
};
