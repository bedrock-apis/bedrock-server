import { BinaryStream } from "@bedrock/base";
import { KernelConstruct, KernelPrivate } from "../../kernel/base.js";
import type { BlockType } from "./BlockType.js";
import { BlockTypes } from "./BlockTypes.js";

export class BlockPermutation {
	public readonly uniqueId: string;
	public readonly runtimeId: number;
	public readonly type: BlockType;
	public get typeId() {
		return this.type.id;
	}
	protected readonly states!: (boolean | number | string)[];
	protected constructor(type: BlockType, runtimeId: number, uniqueId: string) {
		KernelPrivate(new.target);
		this.runtimeId = runtimeId;
		this.uniqueId = uniqueId;
		this.type = type;
	}
	public static resolve(typeId: string, states?: { [k: string]: boolean | number | string }) {
		// Get type if possible
		const type = BlockTypes.get(typeId) as BlockType;

		// If type doesn't exists then just throw
		if (!type) throw new ReferenceError("Unknow typeId " + typeId);

		// No states specified, returing defualt permutation
		if (!states) return type.defaultPermutation;

		// Build permutation unique Id
		const values = [];
		for (const K of Object.keys(type.states.names))
			values.push(states[K] ?? type.states.defualtValues[type.states.names[K]]);
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		const strId = BuildPermutationUniqueId(type, values);

		const permutation = (type as any).permutations.get(strId);

		// If type doesn't exists then just throw
		if (!permutation) throw new ReferenceError("No permutation with this combination of states");
		return permutation as BlockPermutation;
	}
	public getState(stateId: string): boolean | number | string {
		return this.states[(this.type as BlockType).states.names[stateId]];
	}
	public getAllStates(): Record<string, boolean | number | string> {
		const obj = {} as any;
		const names = (this.type as BlockType).states.names;
		for (const K of Object.keys(names)) obj[K] = this.states[names[K]];
		return obj;
	}
}
export function BuildPermutationUniqueId(type: BlockType, data: any[]) {
	const writer = new BinaryStream();
	const types = type.states.types;
	// eslint-disable-next-line unicorn/no-for-loop
	for (let i = 0; i < types.length; i++) {
		const v = data[i];
		types[i][Symbol.RAW_WRITABLE](writer, typeof v === "boolean" ? Number(v) : v);
	}

	return writer.getBuffer().toString("base64");
}

export function ConstructBlockPermutationEmpty(runtimeId: number, states: (boolean | number | string)[]) {
	const permutaion = KernelConstruct(BlockPermutation as any, null as any, runtimeId, "");
	permutaion.states = states;
	return permutaion as BlockPermutation;
}

export function SetTypeFor(permutation: BlockPermutation, type: BlockType) {
	(permutation as any).type = type;
}

export function SetUniqueIdFor(permutation: BlockPermutation){
	(permutation as any).uniqueId = BuildPermutationUniqueId(permutation.type, (permutation as any).states);
}
