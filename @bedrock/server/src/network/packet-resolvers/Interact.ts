import { PacketIds } from "@bedrock/base";
import {
	DisconnectPacket,
	DisconnectReason,
	InteractActions,
	PlayStatusPacket,
	PlayerStatus,
	ResourcePacksInfoPacket,
	Skin,
} from "@bedrock/protocol";
import { TriggerEvent } from "../../types/events/PublicEvent.js";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.Interact] = async (client, packet) => {
	console.log("itneract:", InteractActions[packet.actionId]);
};
