import type { TerrainGenerator } from "../generators/index.js";
import { BlockPermutation } from "../public.js";
import { Chunk } from "./Chunk.js";

export class ChunkManager extends Map<bigint, Chunk>{
	/**
	 * Generator instance
	 */
	public readonly generator;
	/**
	 * Permutation for air
	 */
	public readonly airPermutation: BlockPermutation;
	public constructor(generator: TerrainGenerator, airPermutation: BlockPermutation = BlockPermutation.resolve("air")){
		super();
		// this.world = world;
		this.generator = generator;
		this.airPermutation = airPermutation;
	}
    
	/**
	 * @returns Already generated or new chunk
	 */
	public open(hash: bigint): Chunk{
		const chunk = this.get(hash)??this.generator.apply(new Chunk(hash, this.airPermutation));
		this.set(hash, chunk);
		return chunk;
	}
	public openFromXZ(x: number, z: number){ return this.open(Chunk.getHash(x,z)); }
	public getFromXZ(x: number, z: number){ return this.get(Chunk.getHash(x,z)); }
	public hasFromXZ(x: number, z: number){ return this.has(Chunk.getHash(x,z)); }
}
