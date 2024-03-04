import { Endianness, Int32, ProtocolSerializable, SerializeAs, UUID, VarString, ZigZag, ZigZong } from "@bedrock/base";
import { Skin } from "./Skin.js";

export interface Record {
	buildPlatform?: number;
	entityUniqueId?: bigint;
	isHost?: boolean;
	isTeacher?: boolean;
	platformChatId?: string;
	skin?: Skin;
	username?: string;
	uuid: string;
	xuid?: string;
}

export class RemoveRecord extends ProtocolSerializable {
	// VarInt Length
	@SerializeAs(UUID) public uuid!: string;
}
export class AddRecord extends ProtocolSerializable {
	// VarInt Length
	@SerializeAs(UUID) public uuid!: string;
	@SerializeAs(ZigZong) public entityUniqueId?: bigint;
	@SerializeAs(VarString) public username?: string;
	@SerializeAs(VarString) public xuid?: string;
	@SerializeAs(VarString) public platformChatId?: string;
	@SerializeAs(Int32, Endianness.Little) public buildPlatform?: number;
	@SerializeAs(Skin) public skin?: Skin;
	@SerializeAs(Boolean) public isTeacher?: boolean;
	@SerializeAs(Boolean) public isHost?: boolean;
	public static From(
		uuid: string,
		buildPlatform?: number,
		entityUniqueId?: bigint,
		isHost?: boolean,
		isTeacher?: boolean,
		platformChatId?: string,
		skin?: Skin,
		username?: string,
		xuid?: string,
	) {
		const that = new this();
		that.buildPlatform = buildPlatform;
		that.entityUniqueId = entityUniqueId;
		that.isHost = isHost;
		that.isTeacher = isTeacher;
		that.platformChatId = platformChatId;
		that.skin = skin;
		that.username = username;
		that.uuid = uuid;
		that.xuid = xuid;
	}
}
/*

	public static override write(stream: BinaryStream, value: Records[], endian: Endianness, action: RecordAction): void {
		// Write the number of records.
		stream.writeVarInt(value.length);

		// Loop through the records.
		for (const record of value) {
			// Write the uuid field.
			stream.writeUuid(record.uuid);

			// Check the action type.
			if (action === RecordAction.Add) {
				// Write all the fields for the record.
				stream.writeZigZong(record.entityUniqueId!);
				stream.writeVarString(record.username!);
				stream.writeVarString(record.xuid!);
				stream.writeVarString(record.platformChatId!);
				stream.writeInt32(record.buildPlatform!, endian);
				stream.writeBuffer(record.skin!);
				stream.writeBool(record.isTeacher!);
				stream.writeBool(record.isHost!);
			}
		}

		// For some reason, the client expects a boolean at the end of the packet.
		// This is to indicate that the records are verified.
		if (action === RecordAction.Add) {
			for (const _ of value) {
				stream.writeBool(true);
			}
		}
	}
	*/
