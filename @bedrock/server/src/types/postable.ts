import type { ProtocolPacket } from "@bedrock/base";

export interface Postable<T extends ProtocolPacket = ProtocolPacket>{
    toPacket(): T
}
