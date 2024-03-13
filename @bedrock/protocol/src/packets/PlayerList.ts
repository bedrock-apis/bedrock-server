import {
	AsList,
	Bool,
	Byte,
	Endianness,
	Float,
	Int16,
	Int32,
	Int64,
	LRootTag,
	SerializeAs,
	UUID,
	VarInt,
	VarLong,
	VarString,
	Vector2,
	Vector2f,
	Vector3,
	Vector3f,
	ZigZag,
	ZigZong,
	ProtocolPacket,
	PacketIds,
	PacketId,
	Dynamic,
} from "@bedrock/base";
import type { Record } from "../types/index.js";
import { RecordAction, AddRecord, RemoveRecord } from "../types/index.js";

@PacketId(PacketIds.PlayerList)
export class PlayerListPacket extends ProtocolPacket {
	@SerializeAs(Byte) public action = RecordAction.Add;
	@Dynamic((t) => {
		if (t.action) return RemoveRecord;
		else return AddRecord;
	})
	public records!: Record[];
}
