import type { Buffer } from "@bedrock/base";
import { PublicEvent } from "./PublicEvent.js";

export class ClientConnect extends PublicEvent<[{}]> {}
export class ClientDisconnect extends PublicEvent<[{}]> {}
export class ClientDataRecieved extends PublicEvent<[{ data: Buffer }]> {}
