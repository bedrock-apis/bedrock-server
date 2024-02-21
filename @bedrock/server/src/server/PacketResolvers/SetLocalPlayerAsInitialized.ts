import { PacketIds, UpdateEntityDataPacket } from "../../protocol";
import { MetadataFlags, MetadataKey, MetadataType } from "../../types";
import { ClientPacketResolvers } from "../Client";

ClientPacketResolvers[PacketIds.SetLocalPlayerAsInitialized] = async (client, packet) => {
	const data = new UpdateEntityDataPacket();
	data.runtimeEntityId = packet.runtimeEntityId;
	data.metadata = [
		{
			key: MetadataKey.Flags,
			type: MetadataType.Long,
			value: MetadataFlags.AffectedByGravity,
		}
	];
	client.post(data);
};
