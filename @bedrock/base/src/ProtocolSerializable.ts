import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import type { RawSerializable } from "./BaseSerializable";

export type Constructor<T> = new (...a: any[]) => T;
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
const metadata = new WeakMap<
	new () => ProtocolSerializable,
	[{ endian?: Endianness; key: string; type: RawSerializable<any> }]
>();

export abstract class ProtocolSerializable extends ProtocolType {
	protected Serialize(that: new () => ProtocolSerializable, stream: BinaryStream, value: this, endian?: Endianness) {
		const properties = metadata.get(that) ?? [];
		for (const { type, key, endian } of properties) type[Symbol.RAW_WRITABLE](stream, (value as any)[key], endian);
	}
	protected Deserialize(that: new () => ProtocolSerializable, stream: BinaryStream, endian?: Endianness) {
		const properties = metadata.get(that) ?? [];
		const instance = new that() as any;
		for (const { type, key, endian } of properties) {
			instance[key] = type[Symbol.RAW_READABLE](stream, endian);
		}

		return instance;
	}
}
export function SerializaAs(type: RawSerializable<any>, preferedEndian?: Endianness) {
	return (target: ProtocolSerializable, propertyKey: string) => {
		const meta = metadata.get((target as any).constructor) ?? ([] as any[]);
		meta.push({ key: propertyKey, type, endian: preferedEndian });
		metadata.set((target as any).constructor, meta as any);
	};
}
