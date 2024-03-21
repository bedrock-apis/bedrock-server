import { PacketIds, Vec3 } from "@bedrock/base";
import { UpdateBlockPacket } from "@bedrock/protocol";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.MovePlayer] = (client, packet) => {
	// client.server.broadcast([packet]);
	(client.player as any).location = Vec3.add(packet.position, Vec3(0, -1.62, 0));
};
