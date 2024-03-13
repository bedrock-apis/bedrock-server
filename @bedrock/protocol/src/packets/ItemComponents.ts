import { AsList, PacketId, PacketIds, ProtocolPacket, SerializeAs, VarInt } from "@bedrock/base";
import type { ItemComponentLike, ItemLegacyLike } from "../types/index.js";
import { ItemComponent } from "../types/index.js";

@PacketId(PacketIds.ItemComponent)
export class ItemComponentsPacket extends ProtocolPacket {
	@SerializeAs(ItemComponent) @AsList(VarInt) public items: ItemComponentLike[] = [];
}
