import { BinaryStream } from "@bedrock/base";
import { LevelChunkPacket, NetworkChunkPublisherUpdatePacket } from "@bedrock/protocol";
import { Chunk } from "../chunks/Chunk.js";
import type { InternalPlayer } from "./player.js";

export class ChunkData{
	public readonly dimensionId;
	public readonly chunk;
	public constructor(viewManager: ViewManager, chunk: Chunk){
		this.dimensionId = viewManager.dimensionRuntimeId;
		this.chunk = chunk;
	}
	public toPacket(){
		const a = new LevelChunkPacket();
		a.dimension = this.dimensionId;
		a.cacheEnabled = false;
		a.subChunkCount = this.chunk.getSubChunkSendCount();
		a.position = this.chunk.position;
		const str = new BinaryStream();
		Chunk[Symbol.RAW_WRITABLE](str,this.chunk);
		a.payload = str.getBuffer();
		return a;
	}
}


export class ViewManager{
	public readonly player;
	public readonly postables;
	public readonly sended = new Set<bigint>();
	public get dimension(){return this.player.dimension;}
	public get chunkManager(){return this.dimension.chunkManager;}
	public get dimensionRuntimeId(){return this.dimension.type.runtimeId;}
	public constructor(player: InternalPlayer){ this.player = player; this.postables = player.updates; }
	public sendChunkXZ(x: number, z: number){ return this.sendChunk(Chunk.getHash(x,z)); }
	public sendChunk(hash: bigint){
		if(this.sended.has(hash)) return;
		const chunk = this.chunkManager.open(hash);
		this.sended.add(hash);
		return this.postables.add(new ChunkData(this, chunk));
	}
	public renderFor(chunkRadius: number){
		const packet = new NetworkChunkPublisherUpdatePacket();
		packet.blockRadius = chunkRadius << 4;
		packet.chunkCoords = [];
		// eslint-disable-next-line no-multi-assign
		const data = (packet.sourcePoint = this.player.blockLocation);
		const X = data.x>>4; const Z = data.z>>4;
		this.postables.add(packet);
		for(let x = -chunkRadius; x < chunkRadius; x++){
			for(let z = -chunkRadius; z < chunkRadius; z++){
				packet.chunkCoords.push({x:X+x, z: Z +z});
				this.sendChunkXZ(X+x,Z+z);
			}
		}
	}
	public clear(){return this.sended.clear();}
}
