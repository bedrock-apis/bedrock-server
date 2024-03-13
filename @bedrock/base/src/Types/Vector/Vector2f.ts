import { Endianness } from "@serenityjs/binarystream";
import type { BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../../BaseSerializable.js";
import type { Vector2 } from "./General.js";

export const Vector2f: RawSerializable<Vector2> = {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: Vector2, endian?: Endianness): void {
		const e = endian ?? Endianness.Little;
		stream.writeFloat32(value?.x ?? 0, e);
		stream.writeFloat32(value?.y ?? 0, e);
	},
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): Vector2 {
		const e = endian ?? Endianness.Little;
		const thats = {} as any;
		thats.x = stream.readFloat32(e);
		thats.y = stream.readFloat32(e);
		return thats;
	},
};
