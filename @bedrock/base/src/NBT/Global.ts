import { Buffer } from "node:buffer";
import type { Int16 } from "../BaseTypes";
import { NBTTag } from "./NBTTag";
import type { NBTValue, NBTData } from "./NBTTypes";

declare global {
	interface String extends NBTData<NBTTag.String> {}
	interface BigInt extends NBTData<NBTTag.Int64> {}
	interface Number extends NBTData<NBTTag.Byte | NBTTag.Double | NBTTag.Float | NBTTag.Int16 | NBTTag.Int32> {}
	interface Array<T> extends NBTData<NBTTag.List> {}
	interface NumberConstructor {
		(n: any): Int16;
		new (n: any): Int16;
	}
	interface Object extends NBTData<NBTTag.Compoud> {}
	interface Boolean extends NBTData<NBTTag.Byte> {}
	interface Buffer extends NBTData<NBTTag.ByteArray> {}
	interface BigInt64Array extends NBTData<NBTTag.Int64Array> {}
	interface Int32Array extends NBTData<NBTTag.Int32Array> {}
	interface BigUint64Array extends NBTData<NBTTag.Int64Array> {}
	interface Uint32Array extends NBTData<NBTTag.Int32Array> {}
}
const ES_MAPPINGS = [
	String,
	Object,
	Array,
	Number,
	BigInt,
	Boolean,
	Buffer,
	Int32Array,
	Uint32Array,
	BigInt64Array,
	BigUint64Array,
];
const ES_MAP_TYPES = [
	NBTTag.String,
	NBTTag.Compoud,
	NBTTag.List,
	NBTTag.Int16,
	NBTTag.Int64,
	NBTTag.Byte,
	NBTTag.ByteArray,
	NBTTag.Int32Array,
	NBTTag.Int32Array,
	NBTTag.Int64Array,
	NBTTag.Int64Array,
];
for (const [i, element] of ES_MAPPINGS.entries()) {
	element.prototype[Symbol.NBT_TYPE] = ES_MAP_TYPES[i];
	element.prototype[Symbol.NBT_WRITE] = RawWriter;
}

function RawWriter(this: NBTValue, stream: any, ...params: any[]) {
	stream[this[Symbol.NBT_TYPE] as 1](this.valueOf(), ...params);
}
