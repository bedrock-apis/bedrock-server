import type { Postable } from "../../types/postable.js";
import { ChunkManager } from "../chunks/ChunkManager.js";
import type { TerrainGenerator } from "../generators/Generator.js";
import type { World } from "../world/world.js";
import type { DimensionType } from "./dimension-type.js";

export abstract class Dimension {
	public get typeId() {
		return this.type.id;
	}
	public abstract readonly postables: Set<Postable>;
	public readonly type: DimensionType;
	public readonly id: string;
	public readonly world: World;
	public readonly chunkManager;
	protected constructor(world: World, id: string, type: DimensionType, generator: TerrainGenerator) {
		this.world = world;
		this.id = id;
		this.type = type;
		this.chunkManager = new ChunkManager(generator);
	}
}

export class InternalDimension extends Dimension {
	public readonly postables;
	public constructor(world: World, id: string, type: DimensionType, generator: TerrainGenerator) {
		super(world, id, type, generator);
		this.postables = this.world.postables;
	}
}
