import { BinaryStream } from "@serenityjs/binarystream";
import { PacketIds } from "./Packets.js";
import { FAKE_PACKET, KNOWN_PROTOCOL_PACKETS, type ProtocolPacket } from "./ProtocolPacket.js";

export type PacketLike = ProtocolPacket | {toPacket(): ProtocolPacket};

export class PacketManager {
	private constructor() {}
	public static *DestructPayload(stream: BinaryStream, logger: {error(...params: any): void, warn(...params: any): void}): Generator<ProtocolPacket> {
		do {
			const length = stream.readVarInt();
			const currentOffset = stream.offset;
			const packetId = stream.readVarInt();
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (packetId in KNOWN_PROTOCOL_PACKETS) {
				try {
					yield KNOWN_PROTOCOL_PACKETS[packetId][Symbol.RAW_READABLE](stream);
				} catch (error: unknown) {
					logger.error(error);
					logger.error("Fails to deserialize packet with id: 0x" + packetId.toString(16));
				}
			} else if (PacketIds[packetId])
				logger.warn(`No packet deserializer for "0x${packetId.toString(16)}" known as ${PacketIds[packetId]}`);
			else logger.warn(`Unknown packet with id "0x${packetId.toString(16)}"`);
			stream.offset = currentOffset + length;
		} while (!stream.cursorAtEnd());
	}
	public static StructPayload(stream: BinaryStream, packets: Iterable<PacketLike>) {
		for (const source of packets) {
			let packet;
			if("toPacket" in source) packet = source.toPacket();
			else packet = source;
			const data = new BinaryStream();
			const packetId = packet.packetId;
			if(!(packet as any)[FAKE_PACKET]) data.writeVarInt(packetId);
			KNOWN_PROTOCOL_PACKETS[packetId][Symbol.RAW_WRITABLE](data, packet);
			const buf = data.getBuffer();
			stream.writeVarInt(buf.length);
			stream.writeBuffer(buf);
		}
	}
}
