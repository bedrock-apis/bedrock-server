import { PacketIds, Vec3 } from "@bedrock/base";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.ContainerClose] = (client, packet) => {
	client.post([packet]);
};
