/// <reference types="node" />
import type { Buffer } from 'node:buffer';
import type { BinaryStream } from '@serenityjs/binarystream';
import type { NBTSerializable } from '../NBT';
import { NBTTag, DefinitionReader, DefinitionWriter, Byte } from '../NBT';
declare abstract class BinaryStreamDefinitionWriter extends DefinitionWriter {
    [NBTTag.Byte](value: number): void;
    readonly stream: BinaryStream;
    constructor(stream: BinaryStream);
}
declare abstract class BinaryStreamDefinitionReader extends DefinitionReader {
    [NBTTag.Byte](): Byte;
    readonly stream: BinaryStream;
    constructor(stream: BinaryStream);
}
declare abstract class GeneralNBTDefinitionWriter extends BinaryStreamDefinitionWriter {
    abstract writeArraySize(size: number): void;
    abstract writeCompoudKey(key: string): void;
    writeType(value: number): void;
    [NBTTag.Compoud](value: {
        [k: string]: NBTSerializable;
    }): void;
    [NBTTag.List](value: NBTSerializable[]): void;
    [NBTTag.ByteArray](value: Buffer): void;
    [NBTTag.Int32Array](value: Int32Array | Uint32Array): void;
    [NBTTag.Int64Array](value: BigInt64Array | BigUint64Array): void;
    WriteRootTag(tag: NBTSerializable, rootKey?: string): BinaryStream;
    WriteTag(tag: NBTSerializable): BinaryStream;
    Write(tag: NBTSerializable): BinaryStream;
}
declare abstract class GeneralNBTDefinitionReader extends BinaryStreamDefinitionReader {
    abstract readArraySize(): number;
    abstract readCompoudKey(): string;
    readType(): number;
    [NBTTag.Compoud](): any;
    [NBTTag.List](): NBTSerializable[];
    ReadRootTag(): NBTSerializable<number>;
    ReadTag(): NBTSerializable<number>;
    Read(tagKind: number): NBTSerializable<number>;
    [NBTTag.ByteArray](): Buffer;
    [NBTTag.Int32Array](): Int32Array;
    [NBTTag.Int64Array](): BigInt64Array;
}
declare class NBT {
    protected constructor();
}
export { BinaryStreamDefinitionReader, BinaryStreamDefinitionWriter, GeneralNBTDefinitionReader, GeneralNBTDefinitionWriter, NBT, };
