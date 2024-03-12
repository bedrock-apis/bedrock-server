import { BinaryStream } from "@bedrock/base";
import { LevelChunkPacket, NetworkChunkPublisherUpdatePacket } from "@bedrock/protocol";
import { Chunk } from "../chunks/Chunk.js";
import type { Player } from "./player.js";

export class ChunkData {
	public readonly dimensionId;
	public readonly chunk;
	public constructor(viewManager: ViewManager, chunk: Chunk) {
		this.dimensionId = viewManager.dimensionRuntimeId;
		this.chunk = chunk;
	}
	public toPacket() {
		const a = new LevelChunkPacket();
		a.dimension = this.dimensionId;
		a.cacheEnabled = false;
		a.subChunkCount = this.chunk.getSubChunkSendCount();
		a.position = this.chunk.position;
		const str = new BinaryStream();
		Chunk[Symbol.RAW_WRITABLE](str, this.chunk);
		a.payload = str.getBuffer();
		return a;
	}
}
export class ViewManager {
	public readonly player;
	public readonly context;
	public maxCountPerTick = 2;
	public renderCache = 4;
	public chunksArea = new Set<bigint>();
	public renderNewChunks = new Set<bigint>();
	public lastRenderFor = -6_646_546_546_546n;
	public get dimension() {
		return this.player.dimension;
	}
	public get chunkManager() {
		return this.dimension.chunkManager;
	}
	public get dimensionRuntimeId() {
		return this.dimension.type.runtimeId;
	}
	public constructor(player: Player) {
		this.player = player;
		this.context = player.context;
	}
	public clear() {
		return this.chunkManager.clear();
	}
	public _onRecalculate(chunkRadius: number) {
		const data = this.player.blockLocation;
		const X = Math.ceil(data.x / 16);
		const Z = Math.ceil(data.z / 16);
		if (this.lastRenderFor === (this.lastRenderFor = Chunk.getHash(X, Z))) return false;
		const theSet = new Set<bigint>();
		const currentChunks = this.chunksArea;
		let power = chunkRadius ** 2;
		for (let x = -chunkRadius; x < chunkRadius; x++) {
			for (let z = -chunkRadius; z < chunkRadius; z++) {
				if (x ** 2 + z ** 2 > power) continue;
				const xx = X + x;
				const zz = Z + z;
				const hash = Chunk.getHash(xx, zz);
				theSet.add(hash);
				if (!currentChunks.delete(hash)) this.renderNewChunks.add(hash);
			}
		}

		power = (chunkRadius + 4) ** 2;
		for (const hash of currentChunks) {
			const { x, z } = Chunk.fromHash(hash);
			if (x ** 2 + z ** 2 < power) theSet.add(hash);
		}

		this.chunksArea = theSet;
		return this.renderNewChunks.size;
	}
	public _onTick() {
		this._onRecalculate(this.player.viewDistance);
		if (this.renderNewChunks.size) {
			// Create a new NetworkChunkPublisherUpdate packet.
			const packet = new NetworkChunkPublisherUpdatePacket();

			// Assign the packet data.
			packet.blockRadius = this.player.viewDistance << 4;
			packet.sourcePoint = this.player.blockLocation;
			packet.chunkCoords = [];
			let c = 0;
			for (const hash of this.renderNewChunks) {
				const chunk = this.chunkManager.open(hash);
				this.context.updates.add(new ChunkData(this, chunk));
				packet.chunkCoords.push(chunk.position);
				this.renderNewChunks.delete(hash);
				if (++c >= this.maxCountPerTick) break;
			}

			this.context.updates.add(packet);
		}
	}
}
