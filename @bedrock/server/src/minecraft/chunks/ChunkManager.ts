// import type { World } from "../World";
import type { TerrainGenerator } from "../generators/index.js";
import { BlockPermutation } from "../public.js";
import { Chunk } from "./Chunk.js";

export class ChunkManager{
	/**
	 * Chunks cache
	 */
	public readonly chunks;
	/**
	 * World instance
	 */
	// public readonly world;
	/**
	 * Generator instance
	 */
	public readonly generator;
	/**
	 * Permutation for air
	 */
	public readonly airPermutation: BlockPermutation;
	public constructor(generator: TerrainGenerator, airPermutation: BlockPermutation = BlockPermutation.resolve("air")){
		this.chunks = new Map<bigint,Chunk>();
		// this.world = world;
		this.generator = generator;
		this.airPermutation = airPermutation;
	}
    
	/**
	 * @param x Chunk x
	 * @param y Chunk z
	 * @returns Already generated or new chunk
	 */
	public getChunk(x: number, y: number): Chunk{
		const hash = Chunk.getHash(x,y);
		const chunk = this.chunks.get(hash)??this.generator.apply(new Chunk(x,y, this.airPermutation));
		this.chunks.set(hash, chunk);
		return chunk;
	}
	public getFromHash(hash: bigint){ return this.chunks.get(hash);}
}
