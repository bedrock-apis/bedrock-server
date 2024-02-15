import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import type { Constructor } from "./Meta";

export abstract class ProtocolType {
	protected abstract Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness): void;
	protected abstract Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness): this;
	public static [Symbol.RAW_WRITABLE](stream: BinaryStream, value: any, endian?: Endianness): void {
		this.prototype.Serialize(this as any, stream, value, endian);
	}
	public static [Symbol.RAW_READABLE](stream: BinaryStream, endian?: Endianness): any {
		return this.prototype.Deserialize(this as any, stream, endian);
	}
}
