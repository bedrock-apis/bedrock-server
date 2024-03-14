import type { TerrainGenerator } from "../generators/index.js";
import { BlockPermutation } from "../public.js";
import { Chunk } from "./Chunk.js";

export class ChunkManager extends Map<bigint, {allocCount: number, chunk:Chunk}> {
	/**
	 * Generator instance
	 */
	public readonly generator;
	/**
	 * Permutation for air
	 */
	public readonly airPermutation: BlockPermutation;
	public constructor(generator: TerrainGenerator, airPermutation: BlockPermutation = BlockPermutation.resolve("air")) {
		super();
		// this.world = world;
		this.generator = generator;
		this.airPermutation = airPermutation;
	}
	public getFromXZ(x: number, z: number) {
		return this.get(Chunk.getHash(x, z));
	}
	public hasFromXZ(x: number, z: number) {
		return this.has(Chunk.getHash(x, z));
	}
	public alloc(hash: bigint): Chunk{
		const data = this.get(hash);
		if(data) {
			data.allocCount++;
			return data.chunk;
		}else{
			const chunk = this.generator.apply(new Chunk(hash, this.airPermutation));
			this.set(hash, {chunk, allocCount:1});
			return chunk;
		}
	}
	public dealloc(hash: bigint){
		const data = this.get(hash);
		if(data) {
			data.allocCount--;
			if(data.allocCount <= 0) return this.delete(hash);
		}

		return false;
	}
}
