/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-redeclare */
import { BinaryStream, Endianness } from "@serenityjs/binarystream";
import type { RawReadable, RawWritable } from "./BaseSerializable.js";
import type { DefinitionWriter } from "./NBT/NBT.js";
import { NBTTag } from "./NBT/NBTTag.js";
import type { NBTData } from "./NBT/NBTTypes.js";

/// /////////// JS is not typed language so we should create own data types, mainly for numbers

export abstract class Base<T> {
	protected readonly __value;
	protected constructor(v: T) {
		this.__value = v;
	}
	public valueOf(): T {
		return this.__value;
	}
	public toString() {
		return String(this.__value);
	}
}
export interface SerializableConstructor<T extends TheType<any>> extends RawReadable<T>, RawWritable<T> {
	(v?: unknown): T;
	new (v?: unknown): T;
	readonly default: T extends TheType<infer K> ? K : never;
}
export type TheType<T> = Base<T> & T;
export type Byte = NBTData<NBTTag.Byte> & TheType<number>;
export type SByte = NBTData<NBTTag.Byte> & TheType<number>;
export type Int16 = NBTData<NBTTag.Int16> & TheType<number>;
export type Int32 = NBTData<NBTTag.Int32> & TheType<number>;
export type Int64 = NBTData<NBTTag.Int64> & TheType<bigint>;
export type UInt16 = NBTData<NBTTag.Int16> & TheType<number>;
export type UInt32 = NBTData<NBTTag.Int32> & TheType<number>;
export type UInt64 = NBTData<NBTTag.Int64> & TheType<bigint>;
export type Float = NBTData<NBTTag.Float> & TheType<number>;
export type Double = NBTData<NBTTag.Double> & TheType<number>;
export type VarInt = TheType<number>;
export type VarLong = TheType<bigint>;
export type VarString = TheType<string>;
export type String16 = TheType<string>;
export type String32 = TheType<string>;
export type Bool = NBTData<NBTTag.Byte> & TheType<boolean>;
export type ZigZag = TheType<number>;
export type ZigZong = TheType<bigint>;

export const Byte = function Byte(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Byte) as any, end);
} as unknown as SerializableConstructor<Byte>;
export const SByte = function SByte(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? SByte) as any, end);
} as unknown as SerializableConstructor<SByte>;

export const Int16 = function Int16(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Int16) as any, end);
} as unknown as SerializableConstructor<Int16>;

export const Int32 = function Int32(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Int32) as any, end);
} as unknown as SerializableConstructor<Int32>;

export const Int64 = function Int64(v: bigint, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Int64) as any, end);
} as unknown as SerializableConstructor<Int64>;

export const UInt16 = function UInt16(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? UInt16) as any, end);
} as unknown as SerializableConstructor<UInt16>;

export const UInt32 = function UInt32(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? UInt32) as any, end);
} as unknown as SerializableConstructor<UInt32>;

export const UInt64 = function UInt64(v: bigint, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? UInt64) as any, end);
} as unknown as SerializableConstructor<UInt64>;

export const ZigZag = function ZigZag(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? ZigZag) as any, end);
} as unknown as SerializableConstructor<ZigZag>;

export const ZigZong = function ZigZong(v: bigint, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? ZigZong) as any, end);
} as unknown as SerializableConstructor<ZigZong>;

export const Float = function Float(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Float) as any, end);
} as unknown as SerializableConstructor<Float>;

export const Double = function Double(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Double) as any, end);
} as unknown as SerializableConstructor<Double>;

export const VarInt = function VarInt(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? VarInt) as any, end);
} as unknown as SerializableConstructor<VarInt>;

export const VarLong = function VarLong(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? VarLong) as any, end);
} as unknown as SerializableConstructor<VarLong>;

export const VarString = function VarString(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? VarString) as any, end);
} as unknown as SerializableConstructor<VarString>;

export const String16 = function String16(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? String16) as any, end);
} as unknown as SerializableConstructor<String16>;

export const String32 = function String32(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? String32) as any, end);
} as unknown as SerializableConstructor<String32>;

export const Bool = function Bool(v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Bool) as any, end);
} as unknown as SerializableConstructor<Bool>;

function BaseFunction(v: any, as: SerializableConstructor<any>, end?: Endianness) {
	return Object.setPrototypeOf({ __value: v }, as.prototype);
}

const numberTypes = [
	Byte,
	SByte,
	Int16,
	Int32,
	Int64,
	UInt16,
	UInt32,
	UInt64,
	ZigZag,
	ZigZong,
	Float,
	Double,
	VarInt,
	VarLong,
	VarString,
	String16,
	String32,
	Bool,
];
const defualtValues = [0, 0, 0, 0, 0n, 0, 0, 0n, 0, 0n, 0, 0, 0, 0n, "", "", "", false];
for (const type of numberTypes) {
	Object.setPrototypeOf(type, Base);
	Object.setPrototypeOf(type.prototype, Base.prototype);
}

const methodNames: [
	"Uint8",
	"Int8",
	"Int16",
	"Int32",
	"Int64",
	"Uint16",
	"Uint32",
	"Uint64",
	"ZigZag",
	"ZigZong",
	"Float32",
	"Float64",
	"VarInt",
	"VarLong",
	"VarString",
	"String16",
	"String32",
	"Bool",
] = [
	"Uint8",
	"Int8",
	"Int16",
	"Int32",
	"Int64",
	"Uint16",
	"Uint32",
	"Uint64",
	"ZigZag",
	"ZigZong",
	"Float32",
	"Float64",
	"VarInt",
	"VarLong",
	"VarString",
	"String16",
	"String32",
	"Bool",
];
for (const [i, v] of numberTypes.entries() as any) {
	v.default = defualtValues[i];
	const r = BinaryStream.prototype[`read${methodNames[i]}`] as (e?: Endianness) => any;
	const w = BinaryStream.prototype[`write${methodNames[i]}`] as (v: bigint | number, e?: Endianness) => void;
	Object.defineProperties(
		v,
		Object.getOwnPropertyDescriptors({
			[Symbol.RAW_WRITABLE](
				this: typeof v,
				stream: BinaryStream,
				value: any,
				endian?: Endianness,
				...params: any[]
			): void {
				w.call(stream, value?.valueOf() ?? v.default, endian ?? Endianness.Little);
			},
			[Symbol.RAW_READABLE](this: typeof v, stream: BinaryStream, endian?: Endianness, ...params: any[]) {
				return r.call(stream, endian ?? Endianness.Little);
			},
		}),
	);
}

const nbtDataTypes = [Byte, SByte, Int16, Int32, Int64, UInt16, UInt32, UInt64, Float, Double, Bool];
const nbtTypes = [
	NBTTag.Byte,
	NBTTag.Byte,
	NBTTag.Int16,
	NBTTag.Int32,
	NBTTag.Int64,
	NBTTag.Int16,
	NBTTag.Int32,
	NBTTag.Int64,
	NBTTag.Float,
	NBTTag.Double,
	NBTTag.Byte,
];
for (const [i, v] of nbtDataTypes.entries()) {
	Object.defineProperties(
		v.prototype,
		Object.getOwnPropertyDescriptors({
			[Symbol.NBT_TYPE]: nbtTypes[i],
			[Symbol.NBT_WRITE](definition: DefinitionWriter, ...params: any[]) {
				(definition as any)[this[Symbol.NBT_TYPE]](this.valueOf(), ...params);
			},
		}),
	);
}

export const Int8 = SByte;
export const Uint8 = Byte;
