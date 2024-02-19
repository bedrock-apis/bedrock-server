import { ClientConnectData, HostMessageType } from "../../communcation";
import { PacketIds, PlayStatus, ResourcePacksInfo } from "../../protocol";
import { PlayerStatus } from "../../types";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.Login] = (client, packet) => {
	const {XUID: xuid, displayName, identity} = packet.token.identityData;
	const status = new PlayStatus();
	status.status = PlayerStatus.LoginSuccess;
	client.post(status, new ResourcePacksInfo());
	client.port.PostTask(HostMessageType.PlayerJoin, new ClientConnectData(xuid, client.connection.guid, displayName, identity)).then(e=>{
		// console.log(e);
	}).catch(client.logger.error);
};
