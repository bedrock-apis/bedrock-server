import { Bool, SerializeAs, AsList, Int16, Endianness, VarInt, VarString, Int32, Byte } from "@bedrock/base";
import { ResourceStatus } from "../../../types/enums";
import { BehaviorPackInfo, DataPackInfo, Experiment, PackLink, TexturePackInfo } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.ResourcePacksInfo)
export class ResourcePacksInfo extends ProtocolPacket {
	@SerializeAs(Bool) public mustAccept!: boolean;
	@SerializeAs(Bool) public hasScripts!: boolean;
	@SerializeAs(Bool) public forceServerPacks!: boolean;
	@SerializeAs(BehaviorPackInfo) @AsList(Int16, Endianness.Little) public behaviorPacks!: BehaviorPackInfo[];
	@SerializeAs(TexturePackInfo) @AsList(Int16, Endianness.Little) public texturePacks!: TexturePackInfo[];
	@SerializeAs(PackLink) @AsList(VarInt) public links!: PackLink[];
};

@PacketId(PacketIds.ResourcePackStack)
export class ResourcePackStack extends ProtocolPacket {
	@SerializeAs(Bool) public mustAccept!: boolean;
	@SerializeAs(DataPackInfo) @AsList(VarInt) public behaviorPacks!: DataPackInfo[];
	@SerializeAs(DataPackInfo) @AsList(VarInt) public texturePacks!: DataPackInfo[];
	@SerializeAs(VarString) public gameVersion!: string;
	@SerializeAs(Experiment) @AsList(Int32, Endianness.Little) public experiments!: Experiment[];
	@SerializeAs(Bool) public experimentsPreviouslyToggled!: boolean;
}
@PacketId(PacketIds.ResourcePackClientResponse)
export class ResourcePackClientResponse extends ProtocolPacket {
	@SerializeAs(Byte) public status!: ResourceStatus;
	@SerializeAs(VarString) @AsList(Int16, Endianness.Little) public packIds!: string[];
}
