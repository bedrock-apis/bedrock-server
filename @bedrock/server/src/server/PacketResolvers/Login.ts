import { PacketIds, PlayStatus, ResourcePacksInfo } from "../../protocol";
import { PlayerStatus } from "../../types";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.Login] = (client, packet) => {
	const status = new PlayStatus();
	status.status = PlayerStatus.LoginSuccess;
	client.post(status, new ResourcePacksInfo());
};
