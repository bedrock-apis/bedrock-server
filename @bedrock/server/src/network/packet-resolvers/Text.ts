import { PacketIds } from "@bedrock/base";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.Text] = (client, packet) => {
	const newPacket = client.player._onTextReceived(packet);
	if(newPacket) client.server.broadcast([newPacket]);
};
