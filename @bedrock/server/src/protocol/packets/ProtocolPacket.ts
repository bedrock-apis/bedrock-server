import type { Constructor } from "../types";
import { ProtocolSerializable } from "../types";

export abstract class ProtocolPacket extends ProtocolSerializable {
	public static readonly PacketId: number;
	public readonly packetId: number;
	public constructor() {
		super();
		this.packetId = new.target.PacketId;
	}
}
export const KNOWN_PROTOCOL_PACKETS: { [K: number]: typeof ProtocolPacket } = {};
export function PacketId(packetId: number) {
	return (target: typeof ProtocolPacket) => {
		// @ts-expect-error Its readonly
		target.PacketId = packetId;
		KNOWN_PROTOCOL_PACKETS[packetId] = target;
	};
}
