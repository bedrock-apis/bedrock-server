import type { BinaryStream, Constructor} from "@bedrock/base";
import { Endianness, ProtocolType } from "@bedrock/base";


export class BehaviorPackInfo extends ProtocolType {
	public contentIdentity!: string;
	public contentKey!: string;
	public hasScripts!: boolean;
	public size!: number;
	public subpackName!: string;
	public uuid!: string;
	public version!: string;
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		thats.uuid = stream.readVarString();
		thats.version = stream.readVarString();
		thats.size = stream.readUint32(Endianness.Little);
		thats.contentKey = stream.readVarString();
		thats.subpackName = stream.readVarString();
		thats.contentIdentity = stream.readVarString();
		thats.hasScripts = stream.readBool();
		return thats;
	}
	protected Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		stream.writeVarString(value.uuid);
		stream.writeVarString(value.version);
		stream.writeUint32(value.size, Endianness.Little);
		stream.writeVarString(value.contentKey);
		stream.writeVarString(value.subpackName);
		stream.writeVarString(value.contentIdentity);
		stream.writeBool(value.hasScripts);
	}
}

export class TexturePackInfo extends ProtocolType {
	public contentIdentity!: string;
	public contentKey!: string;
	public hasScripts!: boolean;
	public rtxEnabled!: boolean;
	public size!: number;
	public subpackName!: string;
	public uuid!: string;
	public version!: string;
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		thats.uuid = stream.readVarString();
		thats.version = stream.readVarString();
		thats.size = stream.readUint32(Endianness.Little);
		thats.contentKey = stream.readVarString();
		thats.subpackName = stream.readVarString();
		thats.contentIdentity = stream.readVarString();
		thats.hasScripts = stream.readBool();
		thats.rtxEnabled = stream.readBool();
		return thats;
	}
	protected Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		stream.writeVarString(value.uuid);
		stream.writeVarString(value.version);
		stream.writeUint32(value.size, Endianness.Little);
		stream.writeVarString(value.contentKey);
		stream.writeVarString(value.subpackName);
		stream.writeVarString(value.contentIdentity);
		stream.writeBool(value.hasScripts);
		stream.writeBool(value.rtxEnabled);
	}
}

export class PackLink extends ProtocolType {
	public id!: string;
	public url!: string;
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		thats. id = stream.readVarString();
		thats. url = stream.readVarString();
		return thats;
	}
	protected Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		stream.writeVarString(value.id);
		stream.writeVarString(value.url);
	}
}

export class DataPackInfo extends ProtocolType {
	public name!: string;
	public uuid!: string;
	public version!: string;
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		thats. uuid = stream.readVarString();
		thats. version = stream.readVarString();
		thats. name = stream.readVarString();
		return thats;
	}
	protected Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		stream.writeVarString(value.uuid);
		stream.writeVarString(value.version);
		stream.writeVarString(value.name);
	}
}
export class Experiment extends ProtocolType { // stream.readInt32(Endianness.Little);
	public enabled!: boolean;
	public name!: string;
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		const thats = new that();
		thats.name = stream.readVarString();
		thats.enabled = stream.readBool();
		return thats;
	}
	protected Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		stream.writeVarString(value.name);
		stream.writeBool(value.enabled);
	}
}
