import type { Server } from "../../network/Server.js";
import { PublicEvent } from "./PublicEvent.js";

export class BeforePlayerLogin extends PublicEvent<[{cancel: boolean, name: string, server: Server, uuid: string, xuid: string}]>{}
