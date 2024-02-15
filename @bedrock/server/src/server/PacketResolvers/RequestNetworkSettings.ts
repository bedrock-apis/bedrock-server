import { CompressionMethod } from "../../enums";
import { PacketIds } from "../../protocol";
import { NetworkSettingsPacket } from "../../protocol/packets/KnownPackets/NetworkSettings";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.RequestNetworkSettings] = (client, packet) => {
	if (packet.protocol > client.server.withConfig.protocol) client.logger.warn("Outdated server");
	else if (packet.protocol < client.server.withConfig.protocol) client.logger.warn("Outdate client");

	const p = new NetworkSettingsPacket();
	p.compressionThreshold = 256;
	p.compressionMethod = CompressionMethod.Zlib;
	p.clientThrottle = false;
	p.clientThreshold = 0;
	p.clientScalar = 0;
	client.post(p);
	client.hasCompression = true;
};
