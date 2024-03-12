import { KernelConstruct, KernelPrivate } from "../../kernel/base.js";
import { Type, Types } from "../base/Types.js";

export type TypeMap<T> = T extends boolean?"boolean":T extends number?"number":"string"; 
export class BlockStateTypes extends Types<BlockStateType> {
	protected static TYPES: Map<string, BlockStateType> = new Map();
}
export class BlockStateType<T extends boolean | number | string = boolean | number | string> extends Type {
	public readonly typeOf: TypeMap<T>;
	public get validValues() {
		return [...this._values];
	}
	protected readonly _values = new Set<boolean | number | string>();
	protected constructor(id: string, typeOf: TypeMap<T>, values: Set<boolean | number | string>) {
		KernelPrivate(new.target);
		super(id);
		this.typeOf = typeOf;
		this._values = values;
	}
}
export function ConstructBlockStateType<T extends boolean | number | string>(
	id: string,
	typeOf: TypeMap<T>,
	validValues =  new Set<T>()
) {
	return KernelConstruct(BlockStateType as any, id, typeOf, validValues) as BlockStateType<T>;
}

export function TryGetBlockStateType(id: string): BlockStateType<boolean | number | string> | undefined{
	return (BlockStateTypes as any).TYPES.get(id);
}

export function GetValidValues(id: string): Set<boolean | number | string> | undefined{
	return (TryGetBlockStateType(id) as any)?._values;
}
