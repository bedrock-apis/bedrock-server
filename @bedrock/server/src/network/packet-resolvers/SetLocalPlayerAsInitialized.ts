import { PacketIds } from "@bedrock/base";
import { EntityComponentId} from "../../minecraft/entities/EntityComponents.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.SetLocalPlayerAsInitialized] = async (client, packet) => {
	client.server.gamers.add(client);
	client.engine.players.add(client.player);
	client.player.viewManager.renderFor(15);
	const health = client.player.getComponent(EntityComponentId.Health)!;
	health.effectiveMax = 40;
	const status = client.player.getComponent(EntityComponentId.StatusProperties)!;
	status.isAffectedByGravity = true;
	status.isBreathing = true;
	status.isHasCollision = true;
	client.player.updateAll();
};
