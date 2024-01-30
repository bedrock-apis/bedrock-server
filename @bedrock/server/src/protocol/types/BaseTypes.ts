/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-redeclare */
import { Endianness, BinaryStream } from "@serenityjs/binarystream";
import { RAW_READABLE, RAW_WRITABLE, type RawReadable, type RawWritable } from "./General";

export const HAS_ENDIAN: unique symbol = Symbol("HAS_ENDIAN");
export interface SerializableConstructor<T> extends RawReadable<T> {
	(v?: unknown, preferedEndian?: Endianness): T;
	new (v?: unknown): T;
	readonly prototype: T;
	readonly wrapperConstructor: NumberConstructor | typeof BigIntWrapper;
}
export interface SerializableType<T, OF extends bigint | number = number> extends RawWritable, RawReadable<T> {
	[HAS_ENDIAN]: number;
	valueOf(): OF;
}
export type Byte = SerializableType<Byte> & number;
export type Int16 = SerializableType<Int16> & number;
export type Int32 = SerializableType<Int32> & number;
export type Int64 = SerializableType<Int64, bigint> & bigint;
export type Float = SerializableType<Float> & number;
export type Double = SerializableType<Double> & number;
export type VarInt = SerializableType<VarInt> & number;

class BigIntWrapper {
	protected _$v: bigint;
	public constructor(n: any) {
		this._$v = BigInt(n);
	}
	public valueOf(): bigint {
		return this._$v;
	}
	public toString(): string {
		return BigInt.prototype.toString.call(this.valueOf());
	}
	public toLocalString(): string {
		return BigInt.prototype.toLocaleString.call(this.valueOf());
	}
}
Object.setPrototypeOf(BigIntWrapper, BigInt);
Object.setPrototypeOf(BigIntWrapper.prototype, BigInt.prototype);
export const Byte = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Byte) as any, end);
} as unknown as SerializableConstructor<Byte>;
export const Int16 = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Int16) as any, end);
} as unknown as SerializableConstructor<Int16>;
export const Int32 = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Int32) as any, end);
} as unknown as SerializableConstructor<Int32>;
export const Int64 = function (v: bigint, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Int64) as any, end);
} as unknown as SerializableConstructor<Int64>;
export const Float = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Float) as any, end);
} as unknown as SerializableConstructor<Float>;
export const Double = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Double) as any, end);
} as unknown as SerializableConstructor<Double>;
export const VarInt = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? VarInt) as any, end);
} as unknown as SerializableConstructor<VarInt>;

function BaseFunction(v: any, as: SerializableConstructor<any>, end?: number) {
	const t = new as.wrapperConstructor(v) as any;
	if (typeof end === "number") t[HAS_ENDIAN] = end;
	return Object.setPrototypeOf(t, as.prototype);
}

const numberTypes = [Byte, Int16, Int32, Int64, Float, Double, VarInt];
const ctors = [Number, Number, Number, BigIntWrapper, Number, Number, Number];
const methodNames: ["Uint8", "Int16", "Int32", "Int64", "Float32", "Float64", "VarInt"] = [
	"Uint8",
	"Int16",
	"Int32",
	"Int64",
	"Float32",
	"Float64",
	"VarInt",
];

for (const [i, v] of numberTypes.entries() as any) {
	const r = BinaryStream.prototype[`read${methodNames[i]}`] as (e?: Endianness) => any;
	const w = BinaryStream.prototype[`write${methodNames[i]}`] as (v: bigint | number, e?: Endianness) => void;
	v.prototype = Object.setPrototypeOf(
		{
			constructor: v,
			[HAS_ENDIAN]: Endianness.Little,
			[RAW_WRITABLE](stream: BinaryStream, endian?: Endianness) {
				return w.call(stream, this.valueOf() as any, endian ?? this[HAS_ENDIAN]);
			},
			[RAW_READABLE](stream: BinaryStream, endian?: Endianness) {
				return new (this.constructor ?? v)(r.call(stream, endian ?? this[HAS_ENDIAN]), endian ?? this[HAS_ENDIAN]);
			},
		},
		ctors[i].prototype,
	);
	Object.setPrototypeOf(
		Object.assign(v, {
			[RAW_READABLE](this: NumberConstructor, stream: BinaryStream, endian?: Endianness) {
				return new this(r.call(stream, endian));
			},
			wrapperConstructor: ctors[i],
		}),
		ctors[i],
	);
}
