import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import type { RawSerializable } from "./BaseSerializable.js";

export type Constructor<T> = new (...a: any[]) => T;
export abstract class ProtocolType {
	public abstract Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness): void;
	public abstract Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness): this;
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
	public Serialize(that: new () => this, stream: BinaryStream, value: this, endian?: Endianness) {
		const properties = metadata.get(that) ?? {} as any;
		for (const key of Object.getOwnPropertyNames(properties)) {
			const { type, endian, asArray, dynamic, readOnly, default:def, arrayType, params, conditions = [] } = properties[key];
			if(readOnly) continue;
			let nonSkip = true;
			for (const method of conditions) if(!(nonSkip =method(value))) break;
			if(!nonSkip) continue;
			const v = (value as any)?.[key]??def;
			let theType = type;
			if(typeof dynamic === "function") {
				try {
					theType = dynamic(value, ...params);
				} catch (error: any) {
					error.message = "Dynamic serialization fails because " + error.message;
					throw error;
				}
			}
			
			if(asArray){
				const {type:lType, endian: lEndian } = arrayType;
				const length = v?.length??0;
				lType[Symbol.RAW_WRITABLE](stream, length, lEndian);
				for (let i = 0; i < length; i++) theType[Symbol.RAW_WRITABLE](stream, v[i], endian); 
			} else theType[Symbol.RAW_WRITABLE](stream, v, endian);
		}
	}
	public Deserialize(that: new () => this, stream: BinaryStream, endian?: Endianness): this {
		const properties = metadata.get(that) ?? {} as any;
		const instance = new that() as any;
		for (const key of Object.getOwnPropertyNames(properties)) {
			const { type, endian, asArray, dynamic, arrayType, writeOnly, conditions = [], params } = properties[key];
			if(writeOnly) continue;
			let nonSkip = true;
			for (const method of conditions) if(!(nonSkip = method(instance))) break;
			if(!nonSkip) continue;
			let theType = type;
			try {
				if(typeof dynamic === "function") {
					try {
						theType = dynamic(instance, ...params);
					} catch (error: any) {
						error.message = "Dynamic serialization fails because " + error.message;
						throw error;
					}
				}

				if(asArray){
					const {type:lType, endian: lEndian } = arrayType;
					const v = [] as any[];
					const length = lType[Symbol.RAW_READABLE](stream, lEndian);
					for (let i = 0; i < length; i++) v.push(theType[Symbol.RAW_READABLE](stream, endian));
					instance[key] = v;
				} else instance[key] = theType[Symbol.RAW_READABLE](stream, endian);
			} catch(error: any) {
				error[key + "_properties"] = properties[key];
				throw error;
			}
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

export function Condition<T extends ProtocolSerializable>(condition: (arg: T)=>boolean){
	return (target: T, propertyKey: string) => {
		const meta = (metadata.get((target as any).constructor) ?? {}) as any;
		const metaInfo = meta[propertyKey]??(meta[propertyKey] = {}) as any;
		// eslint-disable-next-line no-multi-assign
		const conditions = (metaInfo.conditions = (metaInfo.condition??[]));
		conditions.push(condition);
		metadata.set((target as any).constructor, meta as any);
	};
}

export function ReadOnly<T extends ProtocolSerializable>(){
	return (target: T, propertyKey: string) => {
		const meta = (metadata.get((target as any).constructor) ?? {}) as any;
		const metaInfo = meta[propertyKey]??(meta[propertyKey] = {}) as any;
		// eslint-disable-next-line no-multi-assign
		metaInfo.readOnly = true;
		metadata.set((target as any).constructor, meta as any);
	};
}

export function WriteOnly<T extends ProtocolSerializable>(){
	return (target: T, propertyKey: string) => {
		const meta = (metadata.get((target as any).constructor) ?? {}) as any;
		const metaInfo = meta[propertyKey]??(meta[propertyKey] = {}) as any;
		// eslint-disable-next-line no-multi-assign
		metaInfo.writeOnly = true;
		metadata.set((target as any).constructor, meta as any);
	};
}

export function Dynamic<T extends ProtocolSerializable, P extends any[]>(type: (that: T, ...params: P)=>RawSerializable<any>, preferedEndian?: Endianness, ...params: P) {
	return (target: T, propertyKey: string) => {
		const meta = (metadata.get((target as any).constructor) ?? {}) as any;
		const metaInfo = meta[propertyKey]??(meta[propertyKey] = {}) as any;
		metaInfo.dynamic = type;

		metaInfo.endian = preferedEndian;
		metaInfo.params = params;
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
