import { KernelConstruct, KernelPrivate } from "../../kernel/base.js";
import type { Postable } from "../../types/postable.js";
import { ChunkManager } from "../chunks/ChunkManager.js";
import type { TerrainGenerator } from "../generators/Generator.js";
import type { World } from "../world/world.js";
import type { DimensionType } from "./dimension-type.js";

export class Dimension {
	public get typeId() {
		return this.type.id;
	}
	public readonly postables: Set<Postable>;
	public readonly type: DimensionType;
	public readonly id: string;
	public readonly world: World;
	public readonly chunkManager;
	protected constructor(world: World, id: string, type: DimensionType, generator: TerrainGenerator) {
		KernelPrivate(new.target);
		this.world = world;
		this.id = id;
		this.type = type;
		this.chunkManager = new ChunkManager(generator);
		this.postables = world.postables;
	}
}
export function ConstructDimension(world: World, id: string, type: DimensionType, generator: TerrainGenerator) {
	return KernelConstruct(Dimension as any, world, id, type, generator) as Dimension;
}
