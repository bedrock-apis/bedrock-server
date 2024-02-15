import { DisconnectReason } from "../../enums";
import { PacketIds } from "../../protocol";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.Login] = (client, packet) => {
	
};
