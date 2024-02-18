import { Endianness } from "@serenityjs/binarystream";
import type { BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../BaseSerializable";
import type { Vector3 } from "./General";
import type { Vec3Constructor } from "./Vec3";
import { Vec3 } from "./Vec3";

export interface Vector3fConstructor extends Vec3Constructor<Vector3f>, RawSerializable<Vector3f> {}
export interface Vector3f extends Vec3 {}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Vector3f = function Vector3f(x = 0, y = 0, z = 0){ return Reflect.construct(Vec3, [x,y,z], new.target??Vector3f); } as Vector3fConstructor;

Object.setPrototypeOf(Vector3f, Vec3);
Object.setPrototypeOf(Vector3f.prototype, Vec3.prototype);
Object.defineProperties(Vector3f, Object.getOwnPropertyDescriptors({
	[Symbol.RAW_WRITABLE](this: Vector3fConstructor, stream: BinaryStream, value: Vector3, endian?: Endianness): void{
		const e = endian??Endianness.Little;
		stream.writeFloat32(value?.x??0, e);
		stream.writeFloat32(value?.y??0, e);
		stream.writeFloat32(value?.z??0, e);
	},
	[Symbol.RAW_READABLE](this: Vector3fConstructor, stream: BinaryStream, endian?: Endianness): Vector3f{
		const e = endian??Endianness.Little;
		const thats = {} as any;
		thats. x = stream.readFloat32(e);
		thats. y = stream.readFloat32(e);
		thats. z = stream.readFloat32(e);
		return Object.setPrototypeOf(thats, this.prototype);
	}
}));
