import type { BinaryStream } from "@serenityjs/binarystream";
import { Endianness } from "@serenityjs/binarystream";
import type { Constructor } from "../general";
import { RawSerialize } from "../general";

export class LoginToken extends RawSerialize {
	public client!: string;
	public identity!: string;
	protected Serialize(
		that: Constructor<this>,
		stream: BinaryStream,
		value: this,
		endian?: Endianness | undefined,
	): void {
		stream.writeVarInt(value.identity.length + value.client.length + 8);
		stream.writeString32(value.identity, Endianness.Little);
		stream.writeString32(value.client, Endianness.Little);
	}
	protected Deserialize(that: Constructor<this>, stream: BinaryStream, endian?: Endianness | undefined): this {
		stream.readVarInt();
		const there = new that();
		there.identity = stream.readString32(Endianness.Little);
		there.client = stream.readString32(Endianness.Little);
		return there;
	}
}
