import type { Client } from "../../network/Client.js";
import { PublicEvent } from "./PublicEvent.js";

export class ClientJoinEvent extends PublicEvent<[{client: Client}]>{}
export class ClientLeaveEvent extends PublicEvent<[{client: Client}]>{}
