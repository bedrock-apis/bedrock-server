/// <reference types="node" />
import { Buffer } from 'node:buffer';
import { Endianness, BinaryStream } from '@serenityjs/binarystream';
import { NbtTag } from './NbtTag';
export interface TagEntry<T extends NbtTag, V> {
    name: string;
    type: T;
    value: V;
}
export interface NbtTags<C = unknown> {
    [NbtTag.End]: TagEntry<NbtTag.End, null>;
    [NbtTag.Byte]: TagEntry<NbtTag.Byte, number>;
    [NbtTag.Short]: TagEntry<NbtTag.Short, number>;
    [NbtTag.Int]: TagEntry<NbtTag.Int, number>;
    [NbtTag.Long]: TagEntry<NbtTag.Long, bigint>;
    [NbtTag.Float]: TagEntry<NbtTag.Float, number>;
    [NbtTag.Double]: TagEntry<NbtTag.Double, number>;
    [NbtTag.ByteList]: TagEntry<NbtTag.ByteList, number[]>;
    [NbtTag.String]: TagEntry<NbtTag.String, string>;
    [NbtTag.List]: TagEntry<NbtTag.List, TagEntry<NbtTag, C>[]>;
    [NbtTag.Compound]: TagEntry<NbtTag.Compound, TagEntry<NbtTag, C>[]>;
    [NbtTag.IntList]: TagEntry<NbtTag.IntList, number[]>;
    [NbtTag.LongList]: TagEntry<NbtTag.LongList, bigint[]>;
}
declare class NamedBinaryTag extends BinaryStream {
    protected readonly varint: boolean;
    protected readonly readLength: (endian?: Endianness | null | undefined) => number;
    protected readonly writeLength: (value: number, endian?: Endianness | null | undefined) => void;
    constructor(buffer?: Buffer, varint?: boolean);
    protected readString(): string;
    protected writeString(value: string): void;
    readTag<T extends keyof NbtTags, C = unknown>(): NbtTags<C>[T];
    readByteTag(): TagEntry<NbtTag.Byte, number>;
    writeByteTag(value: TagEntry<NbtTag.Byte, number>): void;
    readShortTag(): TagEntry<NbtTag.Short, number>;
    writeShortTag(value: TagEntry<NbtTag.Short, number>): void;
    readIntTag(): TagEntry<NbtTag.Int, number>;
    writeIntTag(value: TagEntry<NbtTag.Int, number>): void;
    readLongTag(): TagEntry<NbtTag.Long, bigint>;
    writeLongTag(value: TagEntry<NbtTag.Long, bigint>): void;
    readFloatTag(): TagEntry<NbtTag.Float, number>;
    writeFloatTag(value: TagEntry<NbtTag.Float, number>): void;
    readDoubleTag(): TagEntry<NbtTag.Double, number>;
    writeDoubleTag(value: TagEntry<NbtTag.Double, number>): void;
    readByteListTag(): TagEntry<NbtTag.ByteList, number[]>;
    writeByteListTag(value: TagEntry<NbtTag.ByteList, number[]>): void;
    readStringTag(): TagEntry<NbtTag.String, string>;
    writeStringTag(value: TagEntry<NbtTag.String, string>): void;
    readListTag<C = unknown>(): TagEntry<NbtTag.List, C[]>;
    writeListTag<C = unknown>(value: TagEntry<NbtTag.List, C[]>): void;
    readCompoundTag<C = unknown>(): TagEntry<NbtTag.Compound, TagEntry<NbtTag, unknown>[]>;
}
export { NamedBinaryTag };
