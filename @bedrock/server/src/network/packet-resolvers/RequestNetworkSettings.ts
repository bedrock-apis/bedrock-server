import { PacketIds } from "@bedrock/base";
import { CompressionMethod, DisconnectReason, NetworkSettingsPacket } from "@bedrock/protocol";
import { ClientPacketResolvers } from "../Client.js";

ClientPacketResolvers[PacketIds.RequestNetworkSettings] = (client, packet) => {
	/*
	if (packet.protocol > client.server.protocol)
		return client.disconnect(
			"Outdated server: " + `${packet.protocol} > ${client.server.protocol}`,
			DisconnectReason.OutdatedServer,
		);
	else if (packet.protocol < client.server.protocol)
		return client.disconnect(
			"Outdated client" + `${packet.protocol} < ${client.server.protocol}`,
			DisconnectReason.OutdatedClient,
		);*/
	const p = new NetworkSettingsPacket();
	p.compressionThreshold = 256;
	p.compressionMethod = CompressionMethod.Zlib;
	p.clientThrottle = false;
	p.clientThreshold = 0;
	p.clientScalar = 0;
	client.post([p]);
	client.hasCompression = true;
};
