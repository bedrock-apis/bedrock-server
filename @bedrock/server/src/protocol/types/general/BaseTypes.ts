/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-redeclare */
import type { Endianness } from "@serenityjs/binarystream";
import { BinaryStream } from "@serenityjs/binarystream";
import { ProtocolType } from "./Kernel";
import type { RawSerializable } from "./Meta";

export interface SerializableConstructor<T extends ProtocolType, S = number> extends RawSerializable<S> {
	(v?: unknown): T;
	new (v?: unknown): T;
}
export interface BaseType<T> extends ProtocolType {}

export type TheType<T> = BaseType<T> & T;
export type Byte = TheType<number>;
export type Int16 = TheType<number>;
export type Int32 = TheType<number>;
export type Int64 = TheType<bigint>;
export type Float = TheType<number>;
export type Double = TheType<number>;
export type VarInt = TheType<number>;
export type VarString = TheType<string>;
export type String16 = TheType<string>;
export type String32 = TheType<string>;
export type Bool = TheType<boolean>;
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
} as unknown as SerializableConstructor<Int64, bigint>;
export const Float = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Float) as any, end);
} as unknown as SerializableConstructor<Float>;
export const Double = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Double) as any, end);
} as unknown as SerializableConstructor<Double>;
export const VarInt = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? VarInt) as any, end);
} as unknown as SerializableConstructor<VarInt>;
export const VarString = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? VarString) as any, end);
} as unknown as SerializableConstructor<VarString, string>;
export const String16 = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? String16) as any, end);
} as unknown as SerializableConstructor<String16, string>;
export const String32 = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? String32) as any, end);
} as unknown as SerializableConstructor<String32, string>;
export const Bool = function (v: number, end?: number) {
	return BaseFunction(v ?? 0, (new.target ?? Byte) as any, end);
} as unknown as SerializableConstructor<Bool, boolean>;

function BaseFunction(v: any, as: SerializableConstructor<any>, end?: Endianness) {
	return Object.setPrototypeOf({ __value: v }, as.prototype);
}

const numberTypes = [Byte, Int16, Int32, Int64, Float, Double, VarInt, VarString, String16, String32, Bool];
// const ctors = [Number, Number, Number, BigInt, Number, Number, Number, String, String, String, Boolean];
const methodNames: [
	"Uint8",
	"Int16",
	"Int32",
	"Int64",
	"Float32",
	"Float64",
	"VarInt",
	"VarString",
	"String16",
	"String32",
	"Bool",
] = ["Uint8", "Int16", "Int32", "Int64", "Float32", "Float64", "VarInt", "VarString", "String16", "String32", "Bool"];
for (const [i, v] of numberTypes.entries() as any) {
	const r = BinaryStream.prototype[`read${methodNames[i]}`] as (e?: Endianness) => any;
	const w = BinaryStream.prototype[`write${methodNames[i]}`] as (v: bigint | number, e?: Endianness) => void;
	v.prototype = Object.setPrototypeOf(
		{
			constructor: v,
			Serialize(thats: typeof v, stream: BinaryStream, value: any, endian?: Endianness): void {
				w.call(stream, value.valueOf(), endian);
			},
			Deserialize(thats: typeof v, stream: BinaryStream, endian?: Endianness) {
				return r.call(stream, endian);
			},
		},
		ProtocolType.prototype,
	);
	Object.setPrototypeOf(v, ProtocolType);
}
