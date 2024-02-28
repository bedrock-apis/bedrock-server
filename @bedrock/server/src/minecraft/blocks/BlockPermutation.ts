import { BedrockNBTDefinitionWriter, BinaryStream } from "@bedrock/base";
import type { BlockType, InternalBlockType } from "./BlockType.js";
import { BlockTypes } from "./BlockTypes.js";


export abstract class BlockPermutation {
	public readonly uniqueId: string;
	public readonly runtimeId: number;
	public readonly type: BlockType;
	public get typeId(){return this.type.id;}
	protected abstract readonly states: (boolean | number | string)[];
	protected constructor(type: BlockType, runtimeId: number, uniqueId: string) {
    	this.runtimeId = runtimeId;
    	this.uniqueId = uniqueId;
    	this.type = type;
	}
	public static resolve(typeId: string, states?: {[k: string]: boolean | number | string}){
		        
    	// Get type if possible
    	const type = BlockTypes.get(typeId) as InternalBlockType;
	
    	// If type doesn't exists then just throw
    	if(!type) throw new ReferenceError("Unknow typeId " + typeId);
	
    	// No states specified, returing defualt permutation
    	if(!states) return type.defaultPermutation;
	
    	// Build permutation unique Id
    	const values = [];
    	for (const K of Object.keys(type.states.names)) values.push(states[K]??type.states.defualtValues[type.states.names[K]]);
    	// eslint-disable-next-line @typescript-eslint/no-use-before-define
    	const strId = InternalBlockPermutation.BuildPermutationUniqueId(type, values);
	
    	const permutation = type.permutations.get(strId);
	
    	// If type doesn't exists then just throw
    	if(!permutation) throw new ReferenceError("No permutation with this combination of states");
    	return permutation;
	}
	public getState(stateId: string): boolean | number | string{
		return this.states[(this.type as InternalBlockType).states.names[stateId]];
	}
	public getAllStates(): Record<string, boolean | number | string>{
		const obj = {} as any;
		const names = (this.type as InternalBlockType).states.names;
		for (const K of Object.keys(names)) obj[K] = this.states[names[K]];
		return obj;
	}
}
export class InternalBlockPermutation extends BlockPermutation {
	public readonly states: (boolean | number | string)[] = [];
	public constructor(runtimeId: number, states: (boolean | number | string)[]){
		super(null as any, runtimeId, "");
		this.states = states;
	}
	public static BuildPermutationUniqueId(type: InternalBlockType, data: any[]) {
		const writer = new BinaryStream();
		const types = type.states.types;
		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < types.length; i++) {
			const v = data[i];
			types[i][Symbol.RAW_WRITABLE](writer, typeof v === "boolean"?Number(v):v);
		}
		
		return writer.getBuffer().toString("base64");
	}
	public setType(type: InternalBlockType){
		(this as any).type = type;
		(this as any).uniqueId = InternalBlockPermutation.BuildPermutationUniqueId(type, this.states);
	}
}
