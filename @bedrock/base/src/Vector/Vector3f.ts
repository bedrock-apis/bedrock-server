import { Endianness } from "@serenityjs/binarystream";
import type { BinaryStream } from "@serenityjs/binarystream";
import type { RawSerializable } from "../BaseSerializable";
import type { Vector2 } from "./General";

export interface Vector2fConstructor extends RawSerializable<Vector2f> {
    new (x: number, y: number): Vector2f;
    readonly prototype: Vector2f;
}
export interface Vector2f {
    x: number;
    y: number;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Vector2f = function Vector2f(x = 0, y = 0, z = 0) { return Object.setPrototypeOf({ x, y, z }, new.target.prototype??Vector2f.prototype); } as unknown as Vector2fConstructor;

Object.defineProperties(Vector2f, Object.getOwnPropertyDescriptors({
	[Symbol.RAW_WRITABLE](this: Vector2fConstructor, stream: BinaryStream, value: Vector2, endian?: Endianness): void{
		const e = endian??Endianness.Little;
		stream.writeFloat32(value?.x??0, e);
		stream.writeFloat32(value?.y??0, e);
	},
	[Symbol.RAW_READABLE](this: Vector2fConstructor, stream: BinaryStream, endian?: Endianness): Vector2f{
		const e = endian??Endianness.Little;
		const thats = {} as any;
		thats. x = stream.readFloat32(e);
		thats. y = stream.readFloat32(e);
		return Object.setPrototypeOf(thats, this.prototype);
	}
}));
