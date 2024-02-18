import { Endianness, ProtocolType } from "@bedrock/base";
import type { BinaryStream, Constructor } from "@bedrock/base";
import { GameRuleType } from "../../../enums";

export class GameRule extends ProtocolType { // VarInt
	public editable!: boolean;
	public name!: string;
	public type!: GameRuleType;
	public value!: boolean | number | string;
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		// Read all the fields for the rule.
		thats.name = stream.readVarString();
		thats.editable = stream.readBool();
		thats.type = stream.readVarInt();
		let value: boolean | number;
		switch (thats.type) {
		case GameRuleType.Bool:
			value = stream.readBool();
			break;
		case GameRuleType.Int:
			value = stream.readZigZag();
			break;
		case GameRuleType.Float:
			value = stream.readFloat32(Endianness.Little);
			break;
		}

		thats.value = value;
		return thats;
	}
	public Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {			
		stream.writeVarString(value.name);
		stream.writeBool(value.editable);
		stream.writeVarInt(value.type);
		switch (value.type) {
		default:
			throw new Error(`Writing unknown GameRuleType: ${value.type}`);
		case GameRuleType.Bool:
			stream.writeBool(value.value as boolean);
			break;
		case GameRuleType.Int:
			stream.writeZigZag(value.value as number);
			break;
		case GameRuleType.Float:
			stream.writeFloat32(value.value as number, Endianness.Little);
			break;
		}
	}
}
