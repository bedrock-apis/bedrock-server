/// <reference types="node" />
import { Buffer } from 'node:buffer';
declare enum NBTTag {
    'EndOfCompoud' = 0,
    'Byte' = 1,
    'Int16' = 2,
    'Int32' = 3,
    'Int64' = 4,
    'Float' = 5,
    'Double' = 6,
    'ByteArray' = 7,
    'String' = 8,
    'List' = 9,
    'Compoud' = 10,
    'Int32Array' = 11,
    'Int64Array' = 12
}
declare const NBT_SERIALIZER = "__NBT_SERIALIZER";
declare const NBT_TYPE = "__NBT_TYPE";
declare const NBT_VALUE = "__nbt";
declare const ARRAY_TYPE = "__NBT_ARRAY_TYPE";
interface NBTSerializable<T extends number = number> {
    [NBT_SERIALIZER](definition: DefinitionWriter, ...params: any[]): void;
    [NBT_TYPE]: T;
}
interface NBTKind<T = number, K extends number = number> extends NBTSerializable<K> {
    toString(): string;
    valueOf(): T;
}
type NBTSource<T, K extends number = number> = NBTKind<T, K>;
declare const Construct: unique symbol;
interface NBTKindConstructor<T> {
    (v?: unknown): T;
    new (v?: unknown): T;
    [Construct]: new (v: any) => any;
    readonly prototype: T;
}
interface ListConstructor {
    new <N extends number, T extends any[]>(tag: N): List<N>;
    new <N extends number, T extends any[], M extends (value: T[number], index: number, array: T) => NBTSerializable<N>>(tag: N, array: T, mapFc?: M): List<N>;
    <N extends number, T extends any[]>(tag: N): List<N>;
    <N extends number, T extends any[], M extends (value: T[number], index: number, array: T) => NBTSerializable<N>>(tag: N, array: T, mapFc?: M): List<N>;
    readonly prototype: List<any>;
}
type Byte = NBTSource<number, NBTTag.Byte> & number;
type Int16 = NBTSource<number, NBTTag.Int16> & number;
type Int32 = NBTSource<number, NBTTag.Int32> & number;
type Int64 = NBTSource<bigint, NBTTag.Int64> & number;
type Float = NBTSource<number, NBTTag.Float> & number;
type Double = NBTSource<number, NBTTag.Double> & number;
type List<N extends number> = NBTSerializable<N>[];
declare const List: ListConstructor;
declare const Byte: NBTKindConstructor<Byte>;
declare const Int16: NBTKindConstructor<Int16>;
declare const Int32: NBTKindConstructor<Int32>;
declare const Int64: NBTKindConstructor<never>;
declare const Float: NBTKindConstructor<Float>;
declare const Double: NBTKindConstructor<Double>;
type NBTValue = BigInt64Array | BigUint64Array | Byte | Double | Float | Int16 | Int32 | Int32Array | Int64 | List<number> | NBTSerializable<number> | NBTValue[] | Uint32Array | bigint | number | string | {
    [KEY: string]: NBTValue;
};
interface NBTCompoud {
    [key: string]: NBTValue;
}
declare global {
    interface String extends NBTSerializable<NBTTag.String> {
    }
    interface BigInt extends NBTSerializable<NBTTag.Int64> {
    }
    interface Number extends NBTSerializable<NBTTag.Byte | NBTTag.Double | NBTTag.Float | NBTTag.Int16 | NBTTag.Int32> {
    }
    interface Array<T> extends NBTSerializable<NBTTag.List> {
    }
    interface NumberConstructor {
        (n: any): Int16;
        new (n: any): Int16;
    }
    interface Object extends NBTSerializable<NBTTag.Compoud> {
    }
    interface Boolean extends NBTSerializable<NBTTag.Byte> {
    }
    interface Buffer extends NBTSerializable<NBTTag.ByteArray> {
    }
    interface BigInt64Array extends NBTSerializable<NBTTag.Int64Array> {
    }
    interface Int32Array extends NBTSerializable<NBTTag.Int32Array> {
    }
    interface BigUint64Array extends NBTSerializable<NBTTag.Int64Array> {
    }
    interface Uint32Array extends NBTSerializable<NBTTag.Int32Array> {
    }
}
declare abstract class DefinitionWriter {
    abstract [NBTTag.Byte](value: number): void;
    abstract [NBTTag.Int16](value: number): void;
    abstract [NBTTag.Int32](value: number): void;
    abstract [NBTTag.Float](value: number): void;
    abstract [NBTTag.Double](value: number): void;
    abstract [NBTTag.Int64](value: bigint): void;
    abstract [NBTTag.Compoud](value: {
        [k: string]: NBTSerializable;
    }): void;
    abstract [NBTTag.List](value: NBTSerializable[]): void;
    abstract [NBTTag.ByteArray](value: Buffer): void;
    abstract [NBTTag.Int32Array](value: Int32Array | Uint32Array): void;
    abstract [NBTTag.Int64Array](value: BigInt64Array | BigUint64Array): void;
    abstract [NBTTag.String](value: string): void;
    abstract writeType(value: number): void;
}
declare abstract class DefinitionReader {
    abstract [NBTTag.Byte](): Byte;
    abstract [NBTTag.Int16](): Int16;
    abstract [NBTTag.Int32](): Int32;
    abstract [NBTTag.Float](): Float;
    abstract [NBTTag.Double](): Double;
    abstract [NBTTag.Int64](): Int64;
    abstract [NBTTag.Compoud](): {
        [k: string]: NBTSerializable;
    };
    abstract [NBTTag.List](): NBTSerializable[];
    abstract [NBTTag.ByteArray](): Buffer;
    abstract [NBTTag.Int32Array](): Int32Array;
    abstract [NBTTag.Int64Array](): BigInt64Array;
    abstract [NBTTag.String](): string;
    abstract readType(): number;
}
export { type NBTSerializable, type NBTCompoud, type NBTValue, NBTTag, NBT_SERIALIZER, NBT_TYPE, NBT_VALUE, Byte, Int16, Int32, Int64, Float, Double, List, Int32 as Int, Int64 as Long, Int16 as Short, DefinitionReader, DefinitionWriter, ARRAY_TYPE, };
