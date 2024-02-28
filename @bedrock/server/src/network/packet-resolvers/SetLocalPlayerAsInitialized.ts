import { PacketIds } from "@bedrock/base";
import { AbilityLayer, AbilityLayerFlag } from "@bedrock/protocol";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.SetLocalPlayerAsInitialized] = async (client, packet) => {
	client.server.gamers.add(client);
	client.engine.players.add(client.player);
	client.player.abilities.mine = true;
	client.player.abilities.build = true;
	client.player.abilities.setAbilities(AbilityLayerFlag.AttackPlayers | AbilityLayerFlag.InstantBuild | AbilityLayerFlag.Mine | AbilityLayerFlag.Build);
	client.player.updateAll();
};
