import { Dynamic, Endianness, Float, ProtocolSerializable, SerializeAs, VarInt, VarString, ZigZag } from "@bedrock/base";
import { GameRuleType } from "../enums/index.js";

export interface GameRuleLike{
	editable: boolean;
	name: string;
	type: GameRuleType;
	value: boolean | number;
}
export class GameRule extends ProtocolSerializable { // VarInt
	@SerializeAs(VarString) public name!: string;
	@SerializeAs(Boolean) public editable!: boolean;
	@SerializeAs(VarInt) public type!: GameRuleType;
	@Dynamic(t=>{
		switch (t.type) {
		case GameRuleType.Bool: return Boolean;
		case GameRuleType.Int: return ZigZag;
		case GameRuleType.Float: return Float;
		}
	}, Endianness.Little) public value!: boolean | number;
}
