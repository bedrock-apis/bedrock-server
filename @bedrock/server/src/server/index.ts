import type { MessagePort } from "node:worker_threads";
import { parentPort } from "node:worker_threads";
import "./PacketResolvers";
import { Server } from "./Server";

const server = new Server(parentPort as MessagePort);
