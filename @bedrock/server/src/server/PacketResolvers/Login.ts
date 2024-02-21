import { ClientConnectData, HostMessageType } from "../../communcation";
import { PacketIds, PlayStatusPacket, ResourcePacksInfoPacket } from "../../protocol";
import { PlayerStatus } from "../../types";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.Login] = async (client, packet) => {
	const {XUID: xuid, displayName, identity} = packet.token.identityData;
	Object.assign(client, {
		xuid,
		displayName,
		uuid: client.connection.guid
	});
	client.clientData = packet.token.clientData;
	const loginInfo = await client.port.PostTask(HostMessageType.PlayerJoin, new ClientConnectData(xuid, client.connection.guid, displayName, identity));
	client.setPlayerAsLogged(loginInfo);
	const status = new PlayStatusPacket();
	status.status = PlayerStatus.LoginSuccess;
	client.post(status, new ResourcePacksInfoPacket());
};
