import { Endianness, ProtocolType } from "@bedrock/base";
import type { BinaryStream, Constructor } from "@bedrock/base";
import { GameRuleType , GAMERULE_DEFINITION, GameRules } from "../../../types";

export class GameRule extends ProtocolType { // VarInt
	public editable!: boolean;
	public name!: string;
	public type!: GameRuleType;
	public value!: boolean | number | string;
	public Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
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
export class WorldGameRules extends GameRules{
	public static [Symbol.RAW_WRITABLE](stream: BinaryStream, value: WorldGameRules, endian?: Endianness){
		const allGamerules = Object.keys(GAMERULE_DEFINITION);
		stream.writeVarInt(allGamerules.length);
		for (const ruleId of allGamerules) {
			GameRule.prototype.Serialize(GameRule, stream, Object.setPrototypeOf({value:value[ruleId as "showtags"]}, GAMERULE_DEFINITION[ruleId as "showtags"]) as GameRule);
		}
	}
	public static [Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness) {
		throw new ReferenceError("No implementation");
	};
}
