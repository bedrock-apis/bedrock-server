/// <reference types="node" />
import { Buffer } from 'node:buffer';
import type { BinaryStream } from '@serenityjs/binarystream';
import type { NBTValue } from '../NBT';
import { NBTTag, Int16, Int32, Int64, Float, Double } from '../NBT';
import { GeneralNBTDefinitionWriter, GeneralNBTDefinitionReader, NBT } from './General';
declare class LightNBTDefinitionWriter extends GeneralNBTDefinitionWriter {
    [NBTTag.Int16](value: number): void;
    [NBTTag.Int32](value: number): void;
    [NBTTag.Float](value: number): void;
    [NBTTag.Double](value: number): void;
    [NBTTag.Int64](value: bigint): void;
    [NBTTag.ByteArray](value: Buffer): void;
    [NBTTag.String](value: string): void;
    writeCompoudKey(key: string): void;
    writeArraySize(size: number): void;
}
declare class LightNBTDefinitionReader extends GeneralNBTDefinitionReader {
    readCompoudKey(): string;
    readArraySize(): number;
    [NBTTag.Int16](): Int16;
    [NBTTag.Int32](): Int32;
    [NBTTag.Float](): Float;
    [NBTTag.Double](): Double;
    [NBTTag.Int64](): Int64;
    [NBTTag.ByteArray](): Buffer;
    [NBTTag.String](): string;
}
declare class LightNBT extends NBT {
    static ReadRootTag(stream: BinaryStream): NBTValue;
    static ReadTag(stream: BinaryStream): NBTValue;
    static Read(tag: number, stream: BinaryStream): NBTValue;
    static WriteRootTag(stream: BinaryStream, tag: NBTValue): void;
    static WriteTag(stream: BinaryStream, tag: NBTValue): void;
    static Write(stream: BinaryStream, tag: NBTValue): void;
}
export { LightNBT, LightNBTDefinitionReader, LightNBTDefinitionWriter };
