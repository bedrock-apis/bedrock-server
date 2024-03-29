import { PacketIds } from "@bedrock/base";
import {
	DimensionDataPacket,
	DisconnectPacket,
	DisconnectReason,
	PlayStatusPacket,
	PlayerStatus,
	ResourcePacksInfoPacket,
	Skin,
} from "@bedrock/protocol";
import { TriggerEvent } from "../../types/events/PublicEvent.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.Login] = async (client, packet) => {
	const { XUID: xuid, displayName, identity } = packet.token.identityData;
	client.xuid = xuid;
	client.displayName = displayName;
	client.uuid = identity;
	client.skin = Skin.FromClientData(packet.token.clientData);

	const bob = { name: displayName, xuid, uuid: identity, server: client.server, cancel: false };
	TriggerEvent(client.engine.onBeforePlayerLogin, bob).catch(client.logger.error);

	if (bob.cancel) return client.disconnect("Your connection was canceled by server.", DisconnectReason.Kicked);

	const dimensionData = new DimensionDataPacket();
	dimensionData.definitions = [{
		id: "minecraft:overworld",
		generator: 5,
		maxHeight: 512,
		minHeight: -64,
	}];
	const status = new PlayStatusPacket();
	status.status = PlayerStatus.LoginSuccess;
	client.post([status, dimensionData, new ResourcePacksInfoPacket()]);
};
