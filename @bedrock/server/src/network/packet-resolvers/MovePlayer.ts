import { PacketIds, Vec3 } from "@bedrock/base";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.MovePlayer] = (client, packet) => {
	// client.server.broadcast([packet]);
};
