import { Endianness } from "@serenityjs/binarystream";
import type { BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../../BaseSerializable.js";
import type { Vector3 } from "./General.js";

export const Vector3f: RawSerializable<Vector3> = {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: Vector3, endian?: Endianness): void {
		const e = endian ?? Endianness.Little;
		stream.writeFloat32(value?.x ?? 0, e);
		stream.writeFloat32(value?.y ?? 0, e);
		stream.writeFloat32(value?.z ?? 0, e);
	},
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): Vector3 {
		const e = endian ?? Endianness.Little;
		const thats = {} as any;
		thats.x = stream.readFloat32(e);
		thats.y = stream.readFloat32(e);
		thats.z = stream.readFloat32(e);
		return thats;
	},
};
export const Vector3i: RawSerializable<Vector3> = {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: Vector3, endian?: Endianness): void {
		const e = endian ?? Endianness.Little;
		stream.writeInt32(value?.x ?? 0, e);
		stream.writeInt32(value?.y ?? 0, e);
		stream.writeInt32(value?.z ?? 0, e);
	},
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): Vector3 {
		const e = endian ?? Endianness.Little;
		const thats = {} as any;
		thats.x = stream.readInt32(e);
		thats.y = stream.readInt32(e);
		thats.z = stream.readInt32(e);
		return thats;
	},
};
export const ZigZagVector3: RawSerializable<Vector3> = {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: Vector3, endian?: Endianness): void {
		stream.writeZigZag(value?.x ?? 0);
		stream.writeZigZag(value?.y ?? 0);
		stream.writeZigZag(value?.z ?? 0);
	},
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): Vector3 {
		const thats = {} as any;
		thats.x = stream.readZigZag();
		thats.y = stream.readZigZag();
		thats.z = stream.readZigZag();
		return thats;
	},
};

export const VarVector3: RawSerializable<Vector3> = {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: Vector3, endian?: Endianness): void {
		stream.writeVarInt(value?.x ?? 0);
		stream.writeVarInt(value?.y ?? 0);
		stream.writeVarInt(value?.z ?? 0);
	},
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): Vector3 {
		const thats = {} as any;
		thats.x = stream.readVarInt();
		thats.y = stream.readVarInt();
		thats.z = stream.readVarInt();
		return thats;
	},
};
