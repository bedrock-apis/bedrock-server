import { PacketIds } from "@bedrock/base";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.ModalFormResponse] = (client, packet) => {
	(client.player).formManager.resolve(packet);
};
