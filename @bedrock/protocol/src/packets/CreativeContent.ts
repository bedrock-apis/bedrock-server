import { PacketId, PacketIds, ProtocolPacket, SerializeAs } from "@bedrock/base";
import type { ItemLegacyEntryLike } from "../types/index.js";
import { ItemEntries } from "../types/index.js";

@PacketId(PacketIds.CreativeContent)
export class CreativeContentPacket extends ProtocolPacket {
	@SerializeAs(ItemEntries) public items: ItemLegacyEntryLike[] = [];
}
