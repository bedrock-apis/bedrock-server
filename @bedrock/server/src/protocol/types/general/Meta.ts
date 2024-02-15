import type { BinaryStream, Endianness } from "@serenityjs/binarystream";

export interface RawWritable<T> {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: T, endian?: Endianness): void;
}
export interface RawReadable<T = any> {
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): T;
}
export interface RawSerializable<T> extends RawReadable<T>, RawWritable<T> {}
export type Constructor<T> = new (...params: any) => T;
