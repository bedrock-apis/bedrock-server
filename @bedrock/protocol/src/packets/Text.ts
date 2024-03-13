import {
	AsList,
	Byte,
	Condition,
	PacketId,
	PacketIds,
	ProtocolPacket,
	SerializeAs,
	VarInt,
	VarString,
} from "@bedrock/base";
import { ChatTypes } from "../types/index.js";

@PacketId(PacketIds.Text)
export class TextPacket extends ProtocolPacket {
	@SerializeAs(Byte) public type: ChatTypes = 0;
	@SerializeAs(Boolean) public needTranslation = false;

	@SerializeAs(VarString)
	@Condition((e) => e.type === ChatTypes.Chat || e.type === ChatTypes.Whisper || e.type === ChatTypes.Announcement)
	public sourceName = "";
	@SerializeAs(VarString) public message = "";

	@SerializeAs(VarString)
	@AsList(VarInt)
	@Condition((e) => e.type === ChatTypes.Translation || e.type === ChatTypes.Popup || e.type === ChatTypes.JukeboxPopup)
	public params!: string[];

	@SerializeAs(VarString) public xuid = "";
	@SerializeAs(VarString) public platformChatId = "";
}
