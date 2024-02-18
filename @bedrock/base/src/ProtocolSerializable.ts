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
		const properties = metadata.get(that) ?? {} as any;
		for (const key of Object.getOwnPropertyNames(properties)) {
			const { type, endian, asArray, arrayType } = properties[key];
			const v = (value as any)?.[key];
			if(asArray){
				const {type:lType, endian: lEndian } = arrayType;
				const length = v?.length??0;
				lType[Symbol.RAW_WRITABLE](stream, length, lEndian);
				for (let i = 0; i < length; i++) type[Symbol.RAW_WRITABLE](stream, v[i], endian); 
			} else type[Symbol.RAW_WRITABLE](stream, v, endian);
		}
		
	}
	protected Deserialize(that: new () => ProtocolSerializable, stream: BinaryStream, endian?: Endianness) {
		const properties = metadata.get(that) ?? {} as any;
		const instance = new that() as any;
		for (const key of Object.getOwnPropertyNames(properties)) {
			const { type, endian, asArray, arrayType } = properties[key];
			if(asArray){
				const {type:lType, endian: lEndian } = arrayType;
				const v = [] as any[];
				const length = lType[Symbol.RAW_READABLE](stream, lEndian);
				for (let i = 0; i < length; i++) v.push(type[Symbol.RAW_READABLE](stream, endian));
				instance[key] = v;
			} else instance[key] = type[Symbol.RAW_READABLE](stream, endian);
		}
		
		return instance;
	}
}
export function AsList(type: RawSerializable<number>, preferedEndian?: Endianness){
	return (target: ProtocolSerializable, propertyKey: string) => {
		const meta = (metadata.get((target as any).constructor) ?? {}) as any;
		const metaInfo = meta[propertyKey]??(meta[propertyKey] = {}) as any;
		metaInfo.asArray = true;
		metaInfo.arrayType = {type, endian: preferedEndian};
		metadata.set((target as any).constructor, meta as any);
	};
}

export function SerializeAs(type: RawSerializable<any>, preferedEndian?: Endianness) {
	return (target: ProtocolSerializable, propertyKey: string) => {
		const meta = (metadata.get((target as any).constructor) ?? {}) as any;
		const metaInfo = meta[propertyKey]??(meta[propertyKey] = {}) as any;
		metaInfo.type = type;
		metaInfo.endian = preferedEndian;
		metadata.set((target as any).constructor, meta as any);
	};
}

export function NewSerializable<T>(serialize: (stream: BinaryStream, value: T, endian?: Endianness)=>any, deserialize: (stream: BinaryStream, endian?: Endianness)=>T): RawSerializable<T>{
	return {
		[Symbol.RAW_WRITABLE]: serialize,
		[Symbol.RAW_READABLE]: deserialize
	};
}

export const UUID = NewSerializable((str,v: string)=>{str.writeUuid(v);}, (str)=>str.readUuid());
