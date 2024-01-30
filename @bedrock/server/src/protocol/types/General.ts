import type { BinaryStream, Endianness } from "@serenityjs/binarystream";

export const SERIALIZABLE_TYPE: unique symbol = Symbol("SERIALIZABLE_TYPE");
export const RAW_WRITABLE: unique symbol = Symbol("RAW_WRITABLE");
export const RAW_READABLE: unique symbol = Symbol("RAW_READABLE");
export interface RawWritable {
	[RAW_WRITABLE](stream: BinaryStream, endian?: Endianness): void;
}
export interface RawReadable<T> {
	[RAW_READABLE](stream: BinaryStream, endian?: Endianness): T;
}
export type SerializableGenerator = Generator<RawWritable, void, undefined>;
export type DeserializableGenerator<K extends RawReadable<any> = RawReadable<any>, T = void> = Generator<K, T, K extends RawReadable<infer S>?S:never>;
export interface Serializable {
	[SERIALIZABLE_TYPE](): Generator<RawWritable, void, undefined>;
}
export interface Deserializable<T> {
	[SERIALIZABLE_TYPE]<K extends RawReadable<any>>(): DeserializableGenerator<K, T>;
}
