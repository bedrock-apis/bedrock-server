import type { Buffer } from "node:buffer";
import { BinaryStream } from "@serenityjs/binarystream";
import { SubChunk } from "./SubChunk";
import type { BlockPermutation } from "./Types";


export class Chunk {
	public static readonly MAX_SUB_CHUNKS = 20;

	public readonly x: number;
	public readonly z: number;
	
	protected readonly subchunks: SubChunk[];
	protected readonly defaultPermutation: BlockPermutation;
	
	public constructor(x: number, z: number, defaultPermutation: BlockPermutation) {
		this.x = x;
		this.z = z;
		this.defaultPermutation = defaultPermutation;
		this.subchunks = Array.from({ length: Chunk.MAX_SUB_CHUNKS }, () => new SubChunk(defaultPermutation));
	}
	public setBlock(x: number, y: number, z: number, permutation?: BlockPermutation): void {
		const yl = y + 64;
		// Get the sub chunk.
		const subchunk = this.getSubChunk(yl >> 4);

		// Set the block.
		subchunk.setBlock(x & 0xf, yl & 0xf, z & 0xf, permutation, 0); // 0 = Solids, 1 = Liquids or Logged
	}

	public getBlock(x: number, y: number, z: number): BlockPermutation {
		const yl = y + 64;
		// Get the sub chunk.
		const subchunk = this.getSubChunk(yl >> 4);

		// Get the block.
		return subchunk.getBlock(x & 0xf, yl & 0xf, z & 0xf, 0); // 0 = Solids, 1 = Liquids or Logged
	}

	public static getHash(x: number, z: number): bigint {
		return ((BigInt(x) & 0xffffffffn) << 32n) | (BigInt(z) & 0xffffffffn);
	}

	public static fromHash(hash: bigint): {x:number, z:number} {
		return {
			x: Number(hash >> 32n),
			z: Number(hash & 0xffffffffn),
		};
	}

	public getHash(): bigint { return Chunk.getHash(this.x, this.z); }

	protected getSubChunk(index: number): SubChunk {
		// Check if the sub chunk exists.
		if (!this.subchunks[index]) {
			// Create a new sub chunk.
			for (let i = 0; i <= index; i++) {
				if (!this.subchunks[i]) {
					this.subchunks[i] = new SubChunk(this.defaultPermutation);
				}
			}
		}

		// Return the sub chunk.
		return this.subchunks[index];
	}

	public getSubChunkSendCount(): number {
		// Loop through each sub chunk.
		let count = 0;
		for (let i = Chunk.MAX_SUB_CHUNKS - 1; i >= 0; i--) {
			// Check if the sub chunk is empty.
			if (this.subchunks[i].isEmpty()) {
				count++;
			} else break;
		}

		return Chunk.MAX_SUB_CHUNKS - count;
	}

	public serialize(): Buffer {
		// Create a new stream.
		const stream = new BinaryStream();
		
		// Write 4 empty subchunks
		// This eliminates the -64 to 0 y coordinate bug
		/*
		for (let i = 0; i < 4; i++) {
			stream.writeUint8(8);
			stream.writeUint8(0);
		}*/

		// Serialize each sub chunk.
		for (let i = 0; i < this.getSubChunkSendCount(); ++i) {
			this.subchunks[i].serialize(stream);
		}

		// Biomes?
		for (let i = 0; i < 24; i++) {
			stream.writeByte(0);
			stream.writeVarInt(1 << 1);
		}

		// Border blocks?
		stream.writeByte(0);

		// Return the buffer.
		return stream.getBuffer();
	}
}
