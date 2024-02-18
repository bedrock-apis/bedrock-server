import type { Buffer } from "node:buffer";
import { Endianness } from "@serenityjs/binarystream";
import type { BinaryStream } from "@serenityjs/binarystream";
import { Byte } from "../../BaseTypes";
import { DefinitionReader, DefinitionWriter } from "../NBT";
import { NBTTag } from "../NBTTag";
import type { NBTData, NBTValue } from "../NBTTypes";

abstract class BinaryStreamDefinitionWriter extends DefinitionWriter {
	public override [NBTTag.Byte](value: number) {
		this.stream.writeByte(value);
	}
	public readonly stream;
	public constructor(stream: BinaryStream) {
		super();
		this.stream = stream;
	}
}
abstract class BinaryStreamDefinitionReader extends DefinitionReader {
	public override [NBTTag.Byte]() {
		return Byte(this.stream.readByte());
	}
	public readonly stream;
	public constructor(stream: BinaryStream) {
		super();
		this.stream = stream;
	}
}
abstract class GeneralNBTDefinitionWriter extends BinaryStreamDefinitionWriter {
	public abstract writeArraySize(size: number): void;
	public abstract writeCompoudKey(key: string): void;
	public override writeType(value: number) {
		this.stream.writeByte(value);
	}
	public [NBTTag.Compoud](value: { [k: string]: NBTValue }): void {
		// eslint-disable-next-line prefer-const
		for (let [key, v] of Object.entries(value)) {
			if ("toNBT" in v) v = (v as any).toNBT();
			const type = v[Symbol.NBT_TYPE];
			if (!type) continue;
			this.writeType(type);
			this.writeCompoudKey(key);
			v[Symbol.NBT_WRITE](this);
		}

		this.writeType(NBTTag.EndOfCompoud);
	}
	public [NBTTag.List](value: NBTData[]): void {
		const mainType = (value as any)[Symbol.ARRAY_TYPE] ?? value[0][Symbol.NBT_TYPE];
		this.writeType(mainType);
		this.writeArraySize(value.length);
		for (const a of value) {
			if (mainType !== a[Symbol.NBT_TYPE])
				throw new TypeError(
					`List could has only one kind of type, expected ${NBTTag[mainType]} but got ${NBTTag[a[Symbol.NBT_TYPE]]}`,
				);
			a[Symbol.NBT_WRITE](this);
		}
	}
	public [NBTTag.ByteArray](value: Buffer): void {
		this.stream.writeInt32(value.length, Endianness.Little);
		this.stream.writeBuffer(value);
	}
	public [NBTTag.Int32Array](value: Int32Array | Uint32Array): void {
		this.writeArraySize(value.length);
		for (const i of value) this[NBTTag.Int32](i);
	}
	public [NBTTag.Int64Array](value: BigInt64Array | BigUint64Array): void {
		this.writeArraySize(value.length);
		for (const i of value) this[NBTTag.Int64](i);
	}
	public WriteRootTag(tag: NBTValue, rootKey: string = "") {
		this.writeType(tag[Symbol.NBT_TYPE]);
		this.writeCompoudKey(rootKey);
		this[tag[Symbol.NBT_TYPE] as 1](tag as number);
		return this.stream;
	}
	public WriteTag(tag: NBTValue) {
		this.writeType(tag[Symbol.NBT_TYPE]);
		this[tag[Symbol.NBT_TYPE] as 1](tag as number);
		return this.stream;
	}
	public Write(tag: NBTValue) {
		this[tag[Symbol.NBT_TYPE] as 1](tag as number);
		return this.stream;
	}
}
abstract class GeneralNBTDefinitionReader extends BinaryStreamDefinitionReader {
	public abstract readArraySize(): number;
	public abstract readCompoudKey(): string;
	public override readType(): number {
		return this.stream.readByte();
	}
	public [NBTTag.Compoud]() {
		const compoud = {} as any;
		while (true) {
			const readType = this.readType();
			if (readType === NBTTag.EndOfCompoud) return compoud;
			const keyName = this.readCompoudKey();
			const value = this[readType as 1]();
			compoud[keyName] = value;
		}
	}
	public [NBTTag.List](): NBTValue[] {
		const readType = this.readType();
		const count = this.readArraySize();
		const array = [];
		for (let i = 0; i < count; i++) array.push(this[readType as 1]());
		return array;
	}
	public ReadRootTag() {
		const type = this.readType();
		this.readCompoudKey();
		return this[type as 1]() as NBTValue;
	}
	public ReadTag() {
		const type = this.readType();
		return this[type as 1]() as NBTValue;
	}
	public Read(tagKind: number) {
		return this[tagKind as 1]() as NBTValue;
	}
	public [NBTTag.ByteArray](): Buffer {
		return this.stream.readBuffer(this.readArraySize());
	}
	public [NBTTag.Int32Array](): Int32Array {
		const array = new Int32Array(this.readArraySize());
		for (let i = 0; i < array.length; i++) array[i] = this[NBTTag.Int32]();
		return array;
	}
	public [NBTTag.Int64Array](): BigInt64Array {
		const array = new BigInt64Array(this.readArraySize());
		for (let i = 0; i < array.length; i++) array[i] = this[NBTTag.Int64]();
		return array;
	}
}

class NBT {
	protected constructor() {}
	public static ReadRootTag(stream: BinaryStream): NBTValue { throw new ReferenceError("No implementation error"); }
	public static ReadTag(stream: BinaryStream): NBTValue {throw new ReferenceError("No implementation error"); }
	public static Read(tag: number, stream: BinaryStream): NBTValue { throw new ReferenceError("No implementation error"); }
	public static WriteRootTag(stream: BinaryStream, tag: NBTValue) { throw new ReferenceError("No implementation error"); }
	public static WriteTag(stream: BinaryStream, tag: NBTValue) { throw new ReferenceError("No implementation error"); }
	public static Write(stream: BinaryStream, tag: NBTValue) { throw new ReferenceError("No implementation error"); }
}

export {
	BinaryStreamDefinitionReader,
	BinaryStreamDefinitionWriter,
	GeneralNBTDefinitionReader,
	GeneralNBTDefinitionWriter,
	NBT,
};
