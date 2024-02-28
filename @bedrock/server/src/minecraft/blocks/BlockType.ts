import type { NBTData, NBTTag, RawWritable } from "@bedrock/base";
import { Type } from "../base/Types.js";
import type { BlockPermutation, InternalBlockPermutation } from "./BlockPermutation.js";
import { BlockStateTypes, type BlockStateType } from "./BlockStateTypes.js";

export abstract class BlockType extends Type{
	public readonly defaultRuntimeId: number;
	public readonly abstract defaultPermutation: BlockPermutation;
	protected readonly abstract permutations: Map<string, BlockPermutation>;
	public abstract readonly states: any;
	protected constructor(id: string, runtimeId: number) {
		super(id);
		this.defaultRuntimeId = runtimeId;
	}
	public getAllPermutations(){return this.permutations.values();}
	public *getBlockStates(): IterableIterator<BlockStateType> {
		for (const name of Object.keys(this.states.names)) yield BlockStateTypes.get(name) as BlockStateType;
	}
}
export class InternalBlockType extends BlockType{
	public readonly permutations: Map<string, BlockPermutation> = new Map();
	public readonly states;
	public readonly defaultPermutation: BlockPermutation;
	public constructor(id: string, defualtPermutation: InternalBlockPermutation, definition: {
		defualtValues: any[],
		names: {[k: string]: number},
		types: RawWritable<number | string>[]
	}){
		super(id, defualtPermutation.runtimeId);
		this.defaultPermutation = defualtPermutation;
		this.states = definition;
	}
}
