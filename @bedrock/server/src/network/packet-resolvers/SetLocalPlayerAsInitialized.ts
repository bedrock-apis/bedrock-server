import { PacketIds } from "@bedrock/base";
import { CreativeContentPacket, DimensionDataPacket, PlayStatusPacket, PlayerStatus } from "@bedrock/protocol";
import { creativeItems } from "../../minecraft/items/CreativeItem.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.SetLocalPlayerAsInitialized] = async (client, packet) => {
	client.server.gamers.add(client);
	client.engine.players.add(client.player);
	client.engine.entities.add(client.player);
	client.player._onSetup();
	const creative = new CreativeContentPacket();
	creative.items = creativeItems.map((e,i)=>({entryId: i, item: e}));
	client.post([creative]);
	client.engine.runTimeout(()=>client.player._onReady(), 1);
};
