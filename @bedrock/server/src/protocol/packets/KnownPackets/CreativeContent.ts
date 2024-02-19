import { SerializeAs } from "@bedrock/base";
import { ItemEntries } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.CreativeContent)
export class CreativeContent extends ProtocolPacket {
    @SerializeAs(ItemEntries) public options: ItemEntries = new ItemEntries();
}
