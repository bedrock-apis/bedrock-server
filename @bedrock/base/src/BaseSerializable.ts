import type { BinaryStream, Endianness } from "@serenityjs/binarystream";

export interface RawWritable<T> {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: T, endian?: Endianness): void;
}
export interface RawReadable<T = any> {
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): T;
}
export type RawSerializable<T> = RawReadable<T> & RawWritable<T>;
