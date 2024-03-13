import { PacketIds } from "@bedrock/base";
import {
	ContainerOpenPacket,
	DisconnectPacket,
	DisconnectReason,
	InteractActions,
	PlayStatusPacket,
	PlayerStatus,
	ResourcePacksInfoPacket,
	Skin,
	WindowsIds,
	WindowsTypes,
} from "@bedrock/protocol";
import { TriggerEvent } from "../../types/events/PublicEvent.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.Interact] = async (client, packet) => {
	let p;
	switch (packet.actionId) {
		case InteractActions.OpenInventory:
			p = new ContainerOpenPacket();
			p.position = client.player.location;
			p.targetRuntimeEntityId = client.player.runtimeId;
			p.windowId = WindowsIds.Inventory;
			p.windowType = WindowsTypes.Inventory;
			client.post([p]);
			break;
		default:
			console.log("itneract:", InteractActions[packet.actionId]);
	}
};
