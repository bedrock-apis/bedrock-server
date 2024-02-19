import { PacketIds , NetworkSettingsPacket } from "../../protocol";
import { CompressionMethod, DisconnectReason } from "../../types";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.RequestNetworkSettings] = (client, packet) => {
	if (packet.protocol > client.server.withConfig.protocol) return client.disconnect("Outdated server", DisconnectReason.OutdatedServer);
	else if (packet.protocol < client.server.withConfig.protocol) return client.disconnect("Outdated client", DisconnectReason.OutdatedClient);
	
	const p = new NetworkSettingsPacket();
	p.compressionThreshold = 256;
	p.compressionMethod = CompressionMethod.Zlib;
	p.clientThrottle = false;
	p.clientThreshold = 0;
	p.clientScalar = 0;
	client.post(p);
	client.hasCompression = true;
};
