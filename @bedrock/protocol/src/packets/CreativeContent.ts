import { PacketId, PacketIds, ProtocolPacket, SerializeAs } from "@bedrock/base";
import type { ItemLegacyLike } from "../types/index.js";
import { ItemEntries } from "../types/index.js";


@PacketId(PacketIds.CreativeContent)
export class CreativeContentPacket extends ProtocolPacket {
    @SerializeAs(ItemEntries) public items: ItemLegacyLike[] = [];
}
