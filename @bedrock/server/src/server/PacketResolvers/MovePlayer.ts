import { PacketIds } from "../../protocol";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.MovePlayer] = (client, packet) => {
	// console.log("move: " + Vec3.from(packet.position).toString());
};
