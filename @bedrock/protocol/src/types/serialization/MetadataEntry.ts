import type { BinaryStream, Constructor} from "@bedrock/base";
import { ProtocolType , Endianness, Vector3f} from "@bedrock/base";
import { MetadataKey, MetadataType } from "../enums/Metadata.js";

export class MetadataEntryType extends ProtocolType { // VarInt
	public key!: MetadataKey;
	public type!: MetadataType;
	public value!: any;
	public Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
        
		const thats = new that();
		thats.key = stream.readVarInt();

		if (thats.key === MetadataKey.Flags || thats.key === MetadataKey.FlagsExtended) {
			if ((thats.type = stream.readByte()) === MetadataType.Long) thats.value = stream.readZigZong();
			else thats.value = 0;
		} else {
			let value: any;
			switch ((thats.type = stream.readByte())) {
			case MetadataType.Byte:
				value = stream.readByte();
				break;
			case MetadataType.Short:
				value = stream.readInt16(Endianness.Little);
				break;
			case MetadataType.Int:
				value = stream.readZigZag();
				break;
			case MetadataType.Float:
				value = stream.readFloat32(Endianness.Little);
				break;
			case MetadataType.String:
				value = stream.readVarString();
				break;
			case MetadataType.Compound:
				break;
			case MetadataType.Vec3i:
				break;
			case MetadataType.Long:
				value = stream.readZigZong();
				break;
			case MetadataType.Vec3f:
				value = Vector3f[Symbol.RAW_READABLE](stream);
				break;
			}

			thats.value = value;
		}

		return thats;
	}
	public Serialize(that: Constructor<this>, stream: BinaryStream, value: this, endian?: Endianness | undefined): void {
		// Write the key for the metadata.
		stream.writeVarInt(value.key);
		stream.writeByte(value.type);
		switch (value.type) {
		case MetadataType.Byte:
			stream.writeByte(value.value);
			break;
		case MetadataType.Short:
			stream.writeInt16(value.value, Endianness.Little);
			break;
		case MetadataType.Int:
			stream.writeZigZag(value.value);
			break;
		case MetadataType.Float:
			stream.writeFloat32(value.value, Endianness.Little);
			break;
		case MetadataType.String:
			stream.writeVarString(value.value);
			break;
		case MetadataType.Compound:
			break;
		case MetadataType.Vec3i:
			break;
		case MetadataType.Long:
			stream.writeZigZong(value.value);
			break;
		case MetadataType.Vec3f:
			Vector3f[Symbol.RAW_WRITABLE](stream, value.value);
			break;
		}
	}
}
export interface MetadataEntry {	
	key: MetadataKey;
	type: MetadataType;
	value: any;
}
