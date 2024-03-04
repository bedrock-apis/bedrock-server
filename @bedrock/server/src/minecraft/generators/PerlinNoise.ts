/* eslint-disable no-param-reassign */
// @ts-expect-error Lmao
import fastNoise from "fastnoise-lite";
import type { Chunk } from "../chunks/index.js";
import { BlockPermutation, BlockTypes } from "../public.js";
import { TerrainGenerator } from "./Generator.js";

class RNG{
	/**
	 * name
	 */
	public readonly m = 0x80000000;
	public readonly a = 1_103_515_245;
	public readonly c = 12_345;
	public readonly seed;
	public state;
	public constructor(seed: number) {
		// LCG using GCC's constants
		this.m = 0x80000000; // 2^31
		this.seed = seed;
		this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
	}
	public nextInt(){
		this.state = (this.a * this.state + this.c) % this.m;
		return this.state;
	}
	public nextFloat(){
		// Returns a float in the range [0, 1]
		return this.nextInt() / (this.m - 1);
	}
}
class PerlinNoise{
	protected readonly table;
	public readonly seed: number;
	public constructor(seed: number){
		const rng = new RNG(seed);
		this.seed = seed;
		this.table = Uint8Array.from({length: 256}).map((_, i)=>i);
		const p = this.table;
		for (let i = 255; i > 0; i--) {
			const j = Math.floor(rng.nextFloat() * (i + 1));
			[p[i], p[j]] = [p[j], p[i]];
		}
	}
	protected fade(t: number){ return t * t * t * (t * (t * 6 - 15) + 10); }
	protected grad(hash: number, x: number, z: number){
		const h = hash & 15; // Hash value modulo 16
		const u = h < 8 ? x : z;
		const v = h < 4 ? z : h === 12 || h === 14 ? x : 0;
        
		// Predefined gradient vectors
		const gradVectors = [
			[1, 1], [-1, 1], [1, -1], [-1, -1],
			[1, 0], [-1, 0], [0, 1], [0, -1]
		];
		const gradVector = gradVectors[hash & 0b111];
		return u * gradVector[0] + v * gradVector[1];
	}
	public noise2D(x: number, z: number){
		const X = Math.floor(x) & 255;
		const Z = Math.floor(z) & 255;
		const p = this.table;
		const lerp = this.lerp;
		const fade = this.fade;
		const grad = this.grad;
    
		const xf = x - Math.floor(x);
		const zf = z - Math.floor(z);
    
		const u = fade(xf);
		const v = fade(zf);
    
		const aa = p[p[X] + Z];
		const ab = p[p[X] + Z + 1];
		const ba = p[p[X + 1] + Z];
		const bb = p[p[X + 1] + Z + 1];
    
		const gradAA = grad(aa, xf, zf);
		const gradAB = grad(ab, xf, zf - 1);
		const gradBA = grad(ba, xf - 1, zf);
		const gradBB = grad(bb, xf - 1, zf - 1);
    
		// Scale the result to [-1, 1]
		return lerp(v, lerp(u, gradAA, gradBA), lerp(u, gradAB, gradBB));
	}
	protected lerp(start: number, end: number, amt: number) {
		return (1 - amt) * start + amt * end;
	}
}


export class PerlinGenerator extends TerrainGenerator{
	public readonly air =  BlockPermutation.resolve("air");
	public readonly stone =  BlockPermutation.resolve("stone");
	public readonly moss =  BlockPermutation.resolve("moss_block");
	public readonly water =  BlockPermutation.resolve("water");
	public readonly noise;
	public readonly noise2;
	public readonly noise3;
	public readonly noise4;
	public readonly frequency;
	public readonly inh;
	public constructor(seed: number, frequency = 0.1, inh = 30){
		super(seed);
		this.noise = new fastNoise();
		this.noise.SetNoiseType(fastNoise.NoiseType.OpenSimplex2);
		this.noise.SetSeed(seed);
		this.noise2 = new fastNoise();
		this.noise2.SetNoiseType(fastNoise.NoiseType.OpenSimplex2);
		this.noise2.SetSeed(seed + 1);
		this.noise3 = new fastNoise();
		this.noise3.SetNoiseType(fastNoise.NoiseType.OpenSimplex2);
		this.noise3.SetSeed(seed + 2);
		this.noise4 = new fastNoise();
		this.noise4.SetNoiseType(fastNoise.NoiseType.OpenSimplex2);
		this.noise4.SetSeed(seed + 2);
		this.frequency =frequency;
		this.inh = inh;
	}
	/**
	 * Generates a chunk.
	 *
	 */
	public apply(chunk: Chunk): Chunk {
		const {x:X, z:Z} = chunk.position;
		const XS = X<<4;
		const ZS = Z<<4;
		const p = this.noise;
		const p2 = this.noise2;
		const p3 = this.noise3;
		const p4 = this.noise4;
		const f = 1/this.frequency;
		const i = this.inh;
		// Generate the chunk.
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				const S1 = (x + XS)*f;
				const S2 = (z + ZS)*f;
				let Y = p.GetNoise(S1/10, S2/10) * i;
				Y += p2.GetNoise(S1, S2) * i / 2;
				Y += p3.GetNoise(S1 * 3, S2 * 3) * i / 10;
				// for (let y = 0; y > Y ; y--) chunk.setBlock(x, y, z, this.water);
				Y *= (p4.GetNoise(S1/30, S2/30) + 1) * 0.6;
				Y += 100;
				chunk.setBlock(x, Y, z, this.moss);
				for (let y = Y - 1; y > -64; y--) chunk.setBlock(x, y, z, this.stone);
				for (let y = Y - 1; y < 30; y++) chunk.setBlock(x, y, z, this.water);
			}
		}

		// Return the chunk.
		return chunk;
	}
}
