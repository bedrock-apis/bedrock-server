import { Endianness } from "@bedrock/base";

export abstract class Type {
	public readonly dependencies = new Set<string>();
	public readonly rawId;
	public readonly displayId;
	public constructor(rawId: string, displayId: string) {
		this.rawId = rawId;
		this.displayId = displayId;
	}
	public abstract toJs(): Generator<string>;
	public getType(): string {
		return this.displayId;
	}
	public Read() {
		return `${this.displayId}[Symbol.RAW_READABLE](${["stream", ...this.Params()].join(",")});`;
	}
	public Write(key: string) {
		return `${this.displayId}[Symbol.RAW_WRITABLE](stream,${[key, ...this.Params()].join(",")});`;
	}
	public Params(): string[] {
		return [];
	}
}
export class NativeType extends Type {
	public readonly kind;
	public readonly endianness;
	public constructor(id: string, importId: string, kind: string = "number", endianness?: Endianness) {
		super(id, importId);
		this.kind = kind;
		this.endianness = endianness;
	}
	public *toJs() {}
	public getType(): string {
		return this.kind;
	}
	public Params() {
		if (this.endianness !== undefined) return [String(this.endianness)];
		return [];
	}
}
export class RawType extends Type {
	public readonly write;
	public readonly read;
	public readonly type;
	public constructor(
		rawId: string,
		displayId: string,
		type: string,
		serialize: Iterable<string>,
		deserialize: Iterable<string>,
	) {
		super(rawId, displayId);
		this.write = serialize;
		this.read = deserialize;
		this.type = type;
	}
	public *toJs() {
		yield `export const ${this.displayId} = {`;
		yield* this.Serialization();
		yield "\t,";
		yield* this.Derialization();
		yield "}";
	}
	public *Serialization() {
		yield "\t[Symbol.RAW_READABLE](stream){";
		for (const str of this.read) yield "\t\t" + str + ";";
		yield "\t}";
	}
	public *Derialization() {
		yield "\t[Symbol.RAW_WRITABLE](stream, value){";
		for (const str of this.write) yield "\t\t" + str + ";";
		yield "\t}";
	}
	public getType(): string {
		return this.type;
	}
}
export class StringType extends RawType {
	public constructor(id: string, displayId: string, type: Type, encoding: string = "utf8") {
		super(
			id,
			displayId,
			"string",
			[
				`const buffer = Buffer.from(value??"",${encoding});`,
				type.Write("buffer.length"),
				"stream.writeBuffer(buffer);",
			],
			[`return stream.readBuffer(${type.Read()}).toString(${encoding});`],
		);
	}
}
export class BufferType extends RawType {
	public constructor(id: string, displayId: string, type: Type) {
		super(
			id,
			displayId,
			"Buffer",
			['const buffer = value??Buffer.from("",utf8);', type.Write("buffer.length"), "stream.writeBuffer(buffer);"],
			[`return stream.readBuffer(${type.Read()});`],
		);
	}
}
export abstract class ProtocolType extends Type {}

const filter: any = {
	mcpe_packet: true,
};
const native_types: { [k: string]: NativeType } = {
	varint64: new NativeType("varint64", "VarLong", "bigint"),
	varint: new NativeType("varint", "VarInt"),
	zigzag32: new NativeType("zigzag32", "ZigZag"),
	zigzag64: new NativeType("zigzag64", "ZigZong", "bigint"),
	uuid: new NativeType("uuid", "UUID", "string"),
	lnbt: new NativeType("lnbt", "BRootTag", "object"),
	nbt: new NativeType("nbt", "LRootTag", "object"),
	i8: new NativeType("i8", "SByte"),
	u8: new NativeType("u8", "Byte"),
	bool: new NativeType("bool", "Boolean", "boolean"),
	li32: new NativeType("li32", "Int32"),
	i32: new NativeType("i32", "Int32", "number", Endianness.Big),
	lu32: new NativeType("lu32", "UInt32"),
	li16: new NativeType("li16", "Int16"),
	lu16: new NativeType("lu16", "UInt16"),
	li64: new NativeType("li64", "Int64", "bigint"),
	lu64: new NativeType("lu64", "UInt64", "bigint"),
	string: new NativeType("string", "VarString", "string"),
	string32: new NativeType("string", "VarString", "string"),
	LittleString: new NativeType("LittleString", "String32", "string"),
	ShortString: new NativeType("ShortString", "String16", "string"),
	ByteArray: new NativeType("ByteArray", "VarBuffer", "Buffer"),
};
export class ProtocolManager {
	public readonly protocol: any;
	public readonly knownTypes: Map<string, Type>;
	public constructor(protocol: any) {
		this.protocol = protocol;
		this.knownTypes = new Map();
	}
	public BuildAll() {}
	public get(id: string) {
		if (this.knownTypes.has(id)) return this.knownTypes.get(id)!;
		else if (id in native_types) return native_types[id];
		else if (id in this.protocol) return this.BuildType(id);
		else throw new ReferenceError("UNKNOWN TYPE: " + id);
	}
	protected BuildType(id: string): Type {
		const root = this.protocol[id];
		if (root === "native") throw new TypeError("Native type can't be build");
		const [typeKind, data] = root;
		if (typeKind === "pstring") {
			const strType = new StringType(
				id,
				ProtocolManager.GetScalableName(id),
				this.get(data.countType),
				data.encoding ?? "utf8",
			);
			this.knownTypes.set(id, strType);
			return strType;
		} else if (typeKind === "buffer") {
			const buffType = new BufferType(id, ProtocolManager.GetScalableName(id), this.get(data.countType));
			this.knownTypes.set(id, buffType);
			return buffType;
		}

		return {} as any;
	}
	public static GetScalableName(src: string) {
		return src.replaceAll(/_[^ ]/g, (e) => e[1].toUpperCase());
	}
	public static isPacketById(id: string) {
		return id.startsWith("packet_");
	}
	public static GetPacketName(name: string) {
		return name.slice(6) + "Packet";
	}
}
