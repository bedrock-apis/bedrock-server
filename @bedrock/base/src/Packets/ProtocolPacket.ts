import type { Buffer } from "node:buffer";
import type { BinaryStream, Endianness } from "@serenityjs/binarystream";
import { ProtocolSerializable } from "../ProtocolSerializable.js";

export abstract class ProtocolPacket extends ProtocolSerializable {
	public static readonly PacketId: number;
	public readonly packetId: number;
	public constructor() {
		super();
		this.packetId = new.target.PacketId;
	}
	public toPacket() {
		return this;
	}
}
export const KNOWN_PROTOCOL_PACKETS: { [K: number]: typeof ProtocolPacket } = {};
export function PacketId(packetId: number) {
	return (target: new () => ProtocolPacket) => {
		// @ts-expect-error Its readonly
		target.PacketId = packetId;
		(KNOWN_PROTOCOL_PACKETS as any)[packetId] = target;
	};
}

export const FAKE_PACKET: unique symbol = Symbol("FAKE");
@PacketId(-1)
export class FakeProtocolPacket extends ProtocolPacket {
	public static [FAKE_PACKET]: true;
	public readonly RAW_DATA!: Buffer;
	public readonly FAKE_ID!: number;
	public static From(packeId: number, rawData: Buffer) {
		const that = new this();
		(that as any).RAW_DATA = rawData;
		(that as any).FAKE_ID = packeId;
		return that;
	}
	public static [Symbol.RAW_WRITABLE](stream: BinaryStream, value: any, endian?: Endianness): void {
		stream.writeVarInt(value.FAKE_ID);
		stream.writeBuffer(value.RAW_DATA);
	}
}
