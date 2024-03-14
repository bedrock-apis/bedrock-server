import type { Buffer } from "node:buffer";
import { BinaryStream, Byte, Int32, LightNBT, NBTTag, type ProtocolPacket } from "@bedrock/base";
import { TickSyncPacket } from "@bedrock/protocol";
import { Server } from "../network/index.js";
import { BeforePlayerLogin } from "../types/events/engine.js";
import { Logger, PublicEvent, TriggerEvent } from "../types/index.js";
import type { Postable } from "../types/postable.js";
import type { Plugin } from "./apis/plugin.js";
import { CanonicalBlockTypeMapper } from "./blocks/BlockTypes.js";
import type { Entity, Mob } from "./entities/index.js";
import { CreativeItemDefinitionLoader } from "./items/CreativeItem.js";
import { ItemDefinitionLoader } from "./items/types.js";
import type { Player } from "./players/player.js";
import type { BlockStateType} from "./public.js";
import { BlockTypeBuilder, BlockPermutationBuilder, BlockStateTypeBuilder, Registry } from "./registry.js";
import { World } from "./world/world.js";

export enum LoaderType {
	BlockDefinitions = "canonical_block_states.nbt",
	CreativeItems = "creativeitems.json",
	ItemDefinitions = "required_item_list.json",
}
const loaded: any = {};
const loaders: { [k: string]: (buf: Buffer) => void } = {
	[LoaderType.BlockDefinitions]: CanonicalBlockTypeMapper,
	[LoaderType.ItemDefinitions]: ItemDefinitionLoader,
	[LoaderType.CreativeItems]: CreativeItemDefinitionLoader,
};
const knownPlugins = new Set<Plugin>();
export class Engine {
	public static LoadResource(type: LoaderType, resource: Buffer) {
		loaders[type](resource);
		return (loaded[type] = true);
	}
	public static registryPlugin(plugin: Plugin){ knownPlugins.add(plugin); }
	protected readonly server;
	public readonly registeredPlugins = new Set<Plugin>();
	public readonly definitionRegistry = new Registry();
	public readonly logger = new Logger(Logger.FromRGB(255, 128, 70, true, "ENGINE"));
	public readonly onBeforePlayerLogin = new BeforePlayerLogin();
	public readonly onTick = new PublicEvent<[{currentTick: bigint, engine:Engine}]>();
	public readonly world;
	public readonly postables = new Set<Postable<ProtocolPacket>>();
	public readonly mobs = new Set<Mob>();
	public readonly players = new Set<Player>();
	public readonly entities = new Set<Entity>();
	protected readonly tasks = new Set<any>();
	public currentTick = 0n;
	public oldPerformance = performance.now();
	public delta = 0;
	protected tick() {
		this.oldPerformance = performance.now();
		if(this.currentTick++ >> 4n & 0b1n) this.postables.add(this);
		TriggerEvent(this.onTick, {engine:this,currentTick:this.currentTick}).catch(this.logger.error);
		this.server.broadcast(this.postables);
		this.postables.clear();
		for (const p of this.entities) if(p.isValid()) p._onTick();
		for (const task of this.tasks) if(task.tick--===0) {
			try {
				this.tasks.delete(task);
				task.callback.call(null, ...task.params);
			} catch (error) {
				this.logger.error(error);
			}
		}

		const now = performance.now();
		this.delta = now - this.oldPerformance;
		this.oldPerformance = now;
		if (this.delta > 100) this.logger.warn("[TICK-FREEZING]", this.delta.toFixed(2) + "ms");
	}
	public *__packets() {
		for (const packet of this.postables) yield packet.toPacket();
	}
	public toPacket() {
		const tickSync = new TickSyncPacket();
		tickSync.requestTime = this.currentTick;
		return tickSync;
	}
	public run<T extends any[]>(callback: (...params: T)=>void, ...params: T){
		this.tasks.add({callback,params,tick:0});
	}
	public runTimeout<T extends any[]>(callback: (...params: T)=>void, ticks: number, ...params: T){
		this.tasks.add({callback,params,tick:ticks<0?0:ticks});
	}
	public constructor() {
		// if (!loaded[LoaderType.BlockDefinitions]) throw new ReferenceError("Block definitions are not loaded");
		// if (!loaded[LoaderType.ItemDefinitions]) throw new ReferenceError("Item definitions are not loaded");
		this.world = new World(this);
		this.server = new Server(this);
		loaders[LoaderType.BlockDefinitions] = this.NewCanonicalBlockLoader.bind(this);
		setInterval(async () => this.tick(), 0);
		setInterval(() => {
			console.log("Current delta: " + this.delta);
		}, 15_000);
		for(const plugin of knownPlugins) {
			try {
				plugin._onRegistry(this);
				this.registeredPlugins.add(plugin);
			} catch (error) { this.logger.error("Fail to register the '" + plugin.constructor.name + "' plugin.\n", error); }
		}
	}
	public NewCanonicalBlockLoader(canonical_block_states: Buffer){
		// Create a new BinaryStream from the states buffer.
		const stream = new BinaryStream(canonical_block_states);
		let runtimeId = 0;
		const blockStates = new Map<string,BlockStateTypeBuilder<any>>();
		const blockTypes = new Map<string, BlockTypeBuilder>();
		do {
			// Read the root tag.
			const { name, states } = LightNBT.ReadRootTag(stream) as {
				name: string;
				states: Record<string, Byte | Int32 | string>;
				version: number;
			};

			// Create a runtime ID.
			const names = [] as any[];
			const values = [] as any[];
			const valueTypes = [] as any[];
			const mappedNames = {} as any;
			const currentBlockStates: BlockStateType[] = [];
			let index = 0;
			for (const name of Object.keys(states)) {
				names.push(name);
				const type = states[name] as any;
				let value: boolean | number | string;
				switch (type[Symbol.NBT_TYPE]) {
					case NBTTag.Byte:
						values.push(value = Boolean(type.valueOf()));
						valueTypes.push(Byte);
						break;
					case NBTTag.Int32:
						values.push(value = Number(type));
						valueTypes.push(Int32);
						break;
					case NBTTag.String:
						values.push(value = String(type));
						valueTypes.push(String);
						break;
					default:
						throw new ReferenceError("Faild to map this type of value: " + NBTTag[type[Symbol.NBT_TYPE]]);
				}

				let bState = blockStates.get(name);
				if (!bState) {
					bState = new BlockStateTypeBuilder(name, typeof value as "string");
					bState.registry(this.definitionRegistry);
				}

				bState.addValidType(value);
				currentBlockStates.push(bState.build());

				mappedNames[name] = index;
				blockStates.set(name, bState);
				index++;
			}

			const permutation = new BlockPermutationBuilder(runtimeId++);
			let type = blockTypes.get(name);
			if (!type) {
				type = new BlockTypeBuilder(name);
				type.blockTypeDefinition.defualtValues = values;
				type.blockTypeDefinition.names = mappedNames;
				type.blockTypeDefinition.types = valueTypes;
				type.setDefaultPermutation(permutation.build());
				type.registry(this.definitionRegistry);
				blockTypes.set(name, type);
			}

			permutation.setType(type.build());
			for(const [p,e] of currentBlockStates.entries()) permutation.addBlockState(e, values[p]);
			permutation.registry(this.definitionRegistry);
		} while (!stream.cursorAtEnd());
	}
	public Start(...params: Parameters<Server["Start"]>){
		for(const plugin of this.registeredPlugins) if(plugin.isRegistered) plugin._onServerStart(this.server, params[0]);
		return this.server.Start(...params);
	}
}
