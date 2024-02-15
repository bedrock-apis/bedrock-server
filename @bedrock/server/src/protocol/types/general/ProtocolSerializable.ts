import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import { ProtocolType } from "./Kernel";
import type { RawSerializable } from "./Meta";

const metadata = new WeakMap<
	new () => ProtocolSerializable,
	[{ endian?: Endianness; key: string; type: RawSerializable<any> }]
>();

export abstract class ProtocolSerializable extends ProtocolType {
	public static readonly PacketId: number;
	public readonly packetId: number;
	protected constructor() {
		super();
		this.packetId = new.target.PacketId;
	}
	protected Serialize(that: new () => ProtocolSerializable, stream: BinaryStream, value: this, endian?: Endianness) {
		const properties = metadata.get(that) ?? [];
		for (const { type, key, endian } of properties) type[Symbol.RAW_WRITABLE](stream, value[key as "packetId"], endian);
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
	return (target: any, propertyKey: string) => {
		const meta = metadata.get(target.constructor) ?? ([] as any[]);
		meta.push({ key: propertyKey, type, endian: preferedEndian });
		metadata.set(target.constructor, meta as any);
	};
}

export abstract class RawSerialize extends ProtocolType {
	protected constructor() {
		super();
	}
}
