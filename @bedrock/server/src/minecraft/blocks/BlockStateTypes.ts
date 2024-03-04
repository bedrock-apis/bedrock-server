import { Type, Types } from "../base/Types.js";

export class BlockStateTypes extends Types<BlockStateType> {
	protected static TYPES: Map<string, BlockStateType> = new Map();
}
export abstract class BlockStateType extends Type {
	public abstract readonly typeOf: "boolean" | "number" | "string";
	public abstract readonly validValues: (boolean | number | string)[];
}
export class InternalBlockStateType extends BlockStateType {
	public readonly typeOf: "boolean" | "number" | "string";
	public get validValues() {
		return [...this.values.values()];
	}
	public values = new Set<boolean | number | string>();
	public constructor(id: string, typeOf: "boolean" | "number" | "string", values: Set<boolean | number | string>) {
		super(id);
		this.typeOf = typeOf;
		this.values = values;
	}
}
