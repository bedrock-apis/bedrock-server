import { PacketIds } from "@bedrock/base";
import { CreativeContentPacket } from "@bedrock/protocol";
import { EntityComponentId } from "../../minecraft/entities/EntityComponents.js";
import { creativeItems } from "../../minecraft/items/CreativeItem.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.SetLocalPlayerAsInitialized] = async (client, packet) => {
	client.server.gamers.add(client);
	client.engine.players.add(client.player);
	client.engine.entities.add(client.player);
	client.player.abilities.instantBuild = true;
	client.player.abilities.invulnerable = true;
	const health = client.player.getComponent(EntityComponentId.Health)!;
	health.effectiveMax = 10;
	health.currentValue = 10;
	const speed = client.player.getComponent(EntityComponentId.Movement)!;
	speed.currentValue += 0.1;
	const status = client.player.getComponent(EntityComponentId.StatusProperties)!;
	status.isAffectedByGravity = true;
	status.isBreathing = true;
	status.isHasCollision = true;
	client.player._updateAll();
	const creative = new CreativeContentPacket();
	creative.items = creativeItems.map((e,i)=>({entryId: i + 1, item: e}));
	client.post([creative]);
};
