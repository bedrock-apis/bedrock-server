import { Endianness } from "@serenityjs/binarystream";
import type { BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../../BaseSerializable.js";
import type { Vector3 } from "./General.js";

export const Vector3f: RawSerializable<Vector3> = {
	[Symbol.RAW_WRITABLE](stream: BinaryStream, value: Vector3, endian?: Endianness): void{
		const e = endian??Endianness.Little;
		stream.writeFloat32(value?.x??0, e);
		stream.writeFloat32(value?.y??0, e);
		stream.writeFloat32(value?.z??0, e);
	},
	[Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): Vector3{
		const e = endian??Endianness.Little;
		const thats = {} as any;
		thats. x = stream.readFloat32(e);
		thats. y = stream.readFloat32(e);
		thats. z = stream.readFloat32(e);
		return thats;
	}
};
