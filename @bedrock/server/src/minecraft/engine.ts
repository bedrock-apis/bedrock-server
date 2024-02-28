import type {Buffer} from "node:buffer";
import {nextTick} from "node:process";
import type { ProtocolPacket } from "@bedrock/base";
import { TickSyncPacket } from "@bedrock/protocol";
import { Server } from "../network/index.js";
import { BeforePlayerLogin } from "../types/events/engine.js";
import type { Postable } from "../types/postable.js";
import { CanonicalBlockTypeMapper } from "./blocks/BlockTypes.js";
import type { Entity, Mob } from "./entities/index.js";
import { ItemDefinitionLoader } from "./items/types.js";
import type { Player } from "./players/player.js";
import { World } from "./world/world.js";


export enum LoaderType {
	BlockDefinitions="canonical_block_states.nbt",
	ItemDefinitions="start_game.bin"
}
const loaded: any = {};
const loaders: {[k: string]: (buf: Buffer)=>void} = {
	[LoaderType.BlockDefinitions]: CanonicalBlockTypeMapper,
	[LoaderType.ItemDefinitions]: ItemDefinitionLoader
};
export class Engine{
	public static LoadResource(type: LoaderType, resource: Buffer){
		loaders[type](resource);
		return (loaded[type] = true);
	}
	public readonly onBeforePlayerLogin = new BeforePlayerLogin();
	public readonly server;
	public readonly world;
	public readonly postables = new Set<Postable<ProtocolPacket>>;
	public readonly mobs = new Set<Mob>;
	public readonly players = new Set<Player>;
	public readonly entities = new Set<Entity>;
	public currentTick = 0n;
	public oldPerformance = performance.now();
	public delta = 0;
	public async tick(){
		this.currentTick++;
		const now = performance.now();
		this.delta = now - this.oldPerformance;
		this.oldPerformance = now;
		for(const p of this.mobs) this._mobTick(p);
		this.postables.add(this);
		this.server.broadcast(this.postables);
		for(const p of this.players) this._playerTick(p);
		this.postables.clear();
		if(this.delta < 10) await delay(10);
		else if(this.delta < 25) await delay(5);
		nextTick(async ()=>this.tick());
	}
	public *__packets(){ for (const packet of this.postables) yield packet.toPacket(); }
	public toPacket(){
		const tickSync = new TickSyncPacket();
		tickSync.requestTime = this.currentTick;
		return tickSync;
	}
	public constructor(){
		if(!loaded[LoaderType.BlockDefinitions]) throw new ReferenceError("Block definitions are not loaded");
		if(!loaded[LoaderType.ItemDefinitions]) throw new ReferenceError("Item definitions are not loaded");
		this.world = new World(this);
		this.server = new Server(this);
		nextTick(async ()=>this.tick());
		setInterval(()=>console.log("Current delat: " + this.delta), 10_000);
	}
	
	protected _playerTick(player: Player){ player.client.post(player.updates); player.updates.clear(); }
	protected _mobTick(player: Mob){ }
}
