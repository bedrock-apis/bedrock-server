import type { RawWritable } from "@bedrock/base";
import { KernelConstruct, KernelPrivate } from "../../kernel/base.js";
import { Type } from "../base/Types.js";
import type { BlockPermutation } from "./BlockPermutation.js";
import { BlockStateTypes, type BlockStateType } from "./BlockStateTypes.js";

export interface BlockTypeDefinition {
	defualtValues: any[];
	names: { [k: string]: number };
	types: RawWritable<number | string>[];
};
export class BlockType extends Type {
	public readonly defaultRuntimeId!: number;
	public readonly defaultPermutation!: BlockPermutation;
	protected readonly permutations: Map<string, BlockPermutation> = new Map();
	public readonly states!: BlockTypeDefinition;
	protected constructor(id: string) {
		KernelPrivate(new.target);
		super(id);
	}
	public getAllPermutations() {
		return this.permutations.values();
	}
	public *getBlockStates(): IterableIterator<BlockStateType> {
		for (const name of Object.keys(this.states.names)) yield BlockStateTypes.get(name) as BlockStateType;
	}
}
export function ConstructBlockType(id: string, defualtPermutation: BlockPermutation, definition: BlockTypeDefinition) {
	const type = KernelConstruct(BlockType as any, id);
	type.defaultPermutation = defualtPermutation;
	type.defaultRuntimeId = defualtPermutation.runtimeId;
	type.states = definition;
	return type as BlockType;
}

export function ConstructBlockTypeEmpty(id: string, definition: BlockTypeDefinition){
	const type = KernelConstruct(BlockType as any, id);
	type.states = definition;
	return type as BlockType;
}
