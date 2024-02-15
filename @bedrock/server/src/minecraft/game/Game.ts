import type { Config } from "../../threading";
import { Logger } from "../../utils";
import { EnginePort } from "../core/engine";

export class Game {
	public readonly logger = new Logger("Game");
	protected readonly __engine = new EnginePort();
	protected __isRunning = false;
	protected readonly __config: Config = {
		address: "0.0.0.0",
		maxConnections: 0xffff,
		port: 19_132,
	} as Config;
	public constructor(protocol: number, version: string) {
		this.__config.protocol = protocol;
		this.__config.version = version;
	}
	public get IsRunning() {
		return this.__isRunning;
	}
	public get NetworkAddress() {
		return this.__config.address;
	}
	public set NetworkAddress(v) {
		this.__config.address = v;
	}
	public get Port() {
		return this.__config.port;
	}
	public set Port(v) {
		this.__config.port = v;
	}
	public get MaxPlayers() {
		return this.__config.maxConnections;
	}
	public set MaxPlayers(v) {
		this.__config.maxConnections = v;
	}
	public async Start() {
		return this.__engine.StartGame(this.__config);
	}
}
