import { Byte, Double, Float, Int16, Int32, Int64 } from "./BaseTypes";
import type { DefinitionWriter } from "./NBT";
import { NBTTag } from "./NBTTag";


export type NBTValue = NBTData | NBTValue[] | { [k: string]: NBTValue } | { toNBT(): NBTData };
export interface NBTData<T extends number = number> {
	[Symbol.NBT_TYPE]: T;
	[Symbol.NBT_WRITE](definition: DefinitionWriter, ...params: any): void;
}

interface ListConstructor {
	new <N extends number, T extends any[]>(tag: N): List<N>;
	new <N extends number, T extends any[], M extends (value: T[number], index: number, array: T) => NBTData<N>>(
		tag: N,
		array: T,
		mapFc?: M,
	): List<N>;
	<N extends number, T extends any[]>(tag: N): List<N>;
	<N extends number, T extends any[], M extends (value: T[number], index: number, array: T) => NBTData<N>>(
		tag: N,
		array: T,
		mapFc?: M,
	): List<N>;
	readonly prototype: List<any>;
}

export type List<T extends number> = NBTData<T>[];

const ConversionTypes = {
	[NBTTag.Byte]: Byte,
	[NBTTag.Int16]: Int16,
	[NBTTag.Int32]: Int32,
	[NBTTag.Int64]: Int64,
	[NBTTag.Double]: Double,
	[NBTTag.Float]: Float,
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const List = function List(tag: number, array?: NBTData[], mapFc?: (a: any, i: number, n: any[]) => any) {
	const a = [] as any[];
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const has = tag in ConversionTypes;
	let i = 0;
	if (array)
		for (let v of array) {
			if (mapFc) v = mapFc(v, i++, array);
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			else if (v[Symbol.NBT_TYPE] in ConversionTypes && has) v = ConversionTypes[tag as 1](v);
			if (v[Symbol.NBT_TYPE] !== tag) throw new TypeError("Mapped value must be type of " + NBTTag[tag]);
			a.push(v);
		}

	return Object.setPrototypeOf(Object.assign(a, { [Symbol.ARRAY_TYPE]: tag }), new.target?.prototype ?? List.prototype);
} as ListConstructor;

Object.setPrototypeOf(List, Array);
Object.setPrototypeOf(List.prototype, Array.prototype);
