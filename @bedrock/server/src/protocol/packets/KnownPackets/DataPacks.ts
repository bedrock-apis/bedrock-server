import { Bool, SerializaAs, AsList, Int16, Endianness, VarInt, VarString, Int32, Byte } from "@bedrock/base";
import { ResourceStatus } from "../../../enums";
import { BehaviorPackInfo, DataPackInfo, Experiment, PackLink, TexturePackInfo } from "../../types";
import { PacketIds } from "../Packets";
import { PacketId, ProtocolPacket } from "../ProtocolPacket";

@PacketId(PacketIds.ResourcePacksInfo)
export class ResourcePacksInfo extends ProtocolPacket {
	@SerializaAs(Bool) public mustAccept!: boolean;
	@SerializaAs(Bool) public hasScripts!: boolean;
	@SerializaAs(Bool) public forceServerPacks!: boolean;
	@SerializaAs(BehaviorPackInfo) @AsList(Int16, Endianness.Little) public behaviorPacks!: BehaviorPackInfo[];
	@SerializaAs(TexturePackInfo) @AsList(Int16, Endianness.Little) public texturePacks!: TexturePackInfo[];
	@SerializaAs(PackLink) @AsList(VarInt) public links!: PackLink[];
};

@PacketId(PacketIds.ResourcePackStack)
export class ResourcePackStack extends ProtocolPacket {
	@SerializaAs(Bool) public mustAccept!: boolean;
	@SerializaAs(DataPackInfo) @AsList(VarInt) public behaviorPacks!: DataPackInfo[];
	@SerializaAs(DataPackInfo) @AsList(VarInt) public texturePacks!: DataPackInfo[];
	@SerializaAs(VarString) public gameVersion!: string;
	@SerializaAs(Experiment) @AsList(Int32, Endianness.Little) public experiments!: Experiment[];
	@SerializaAs(Bool) public experimentsPreviouslyToggled!: boolean;
}
@PacketId(PacketIds.ResourcePackClientResponse)
export class ResourcePackClientResponse extends ProtocolPacket {
	@SerializaAs(Byte) public status!: ResourceStatus;
	@SerializaAs(VarString) @AsList(Int16, Endianness.Little) public packIds!: string[];
}
