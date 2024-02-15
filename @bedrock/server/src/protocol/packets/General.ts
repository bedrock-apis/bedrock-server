import { BinaryStream } from "@serenityjs/binarystream";
import type { Logger } from "../../utils";
import { PacketIds } from "./Packets";
import { KNOWN_PROTOCOL_PACKETS, type ProtocolPacket } from "./ProtocolPacket";

export class PacketManager {
	private constructor() {}
	public static *DestructPayload(stream: BinaryStream, logger: Logger): Generator<ProtocolPacket> {
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
	public static StructPayload(stream: BinaryStream, packets: Iterable<ProtocolPacket>, logger: Logger) {
		for (const packet of packets) {
			const data = new BinaryStream();
			const packetId = packet.packetId;
			data.writeVarInt(packetId);
			KNOWN_PROTOCOL_PACKETS[packetId][Symbol.RAW_WRITABLE](data, packet);
			const buf = data.getBuffer();
			stream.writeVarInt(buf.length);
			stream.writeBuffer(buf);
		}
	}
}
