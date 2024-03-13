import { Byte, Int32 } from "@bedrock/base";
import { ConstructBlockPermutationEmpty, SetTypeFor, SetUniqueIdFor, type BlockPermutation} from "./blocks/BlockPermutation.js";
import { ConstructBlockStateType, type TypeMap } from "./blocks/BlockStateTypes.js";
import type { BlockTypeDefinition} from "./blocks/BlockType.js";
import { ConstructBlockTypeEmpty } from "./blocks/BlockType.js";
import { BlockStateTypes, BlockTypes} from "./public.js";
import type { BlockStateType, BlockType } from "./public.js";

const stateTypeMap = {
    "string":String,
    "number":Int32,
    "boolean":Byte,
};
export class Registry{
    public registryBlockType(type: BlockType){
        const types = (BlockTypes as any).TYPES as Map<string, BlockType>;
        types.set(type.id, type);
        return type;
    }
    public registryBlockPermutation(permutation: BlockPermutation){
        const permutations = (BlockTypes as any).PERMUTATIONS as Map<number, BlockPermutation>;
        permutations.set(permutation.runtimeId, permutation);
        (permutation.type as any).permutations.set(permutation.uniqueId, permutation);
        return permutation;
    }
    public registryBlockStateType<T extends boolean | number | string>(stateType: BlockStateType<T>): BlockStateType<T>{
        (BlockStateTypes as any).TYPES.set(stateType.id, stateType);
        return stateType;
    }
    public getBlockStateType(id: string): BlockStateType | undefined{ return (BlockStateTypes as any).TYPES.get(id); }
    public getBlockType(id: string): BlockType | undefined{ return (BlockTypes as any).TYPES.get(id); }
    public getBlockPermutation(runtimeId: number){ return (BlockTypes as any).PERMUTATIONS.get(runtimeId); }
}
export abstract class RegistryBuilder{
    public abstract registry(reg: Registry): void;
}
export class BlockTypeBuilder extends RegistryBuilder{
    public readonly typeId: string;
    public readonly type: BlockType;
    public readonly blockTypeDefinition: BlockTypeDefinition = {defualtValues:[], names:{}, types:[]};
    public constructor(typeId: string){
        super();
        this.typeId = typeId;
        this.type = ConstructBlockTypeEmpty(typeId, this.blockTypeDefinition);
    }
    public setDefaultPermutation(permutation: BlockPermutation){
        (this.type.defaultPermutation as any) = permutation;
        (this.type.defaultRuntimeId as any) = permutation.runtimeId;
        return this;
    }
    public addStateValue<T extends boolean | number | string>(state: BlockStateType<T>, defaultValue: T){
        const def = this.blockTypeDefinition;
        def.names[state.id] = def.types.length;
        def.types.push(stateTypeMap[state.typeOf]);
        def.defualtValues.push(defaultValue);
        return this;
    }
    public build(){
        return this.type;
    }
    public registry(reg: Registry): void {reg.registryBlockType(this.build());}
}
export class BlockPermutationBuilder extends RegistryBuilder{
    public readonly runtimeId: number;
    public readonly states: (boolean | number | string)[];
    public readonly permutation;
    public type?: BlockType;
    public constructor(runtimeId: number, type?: BlockType){
        super();
        this.runtimeId = runtimeId;
        this.type = type;
        this.states = [];
        this.permutation = ConstructBlockPermutationEmpty(runtimeId, this.states);
    }
    public setType(type: BlockType){
        if(this.type) throw new ReferenceError("This permutation builder has type already specified.");
        else SetTypeFor(this.permutation, this.type = type);
        return this;
    };
    public addBlockState<T extends boolean | number | string>(blockState: BlockStateType<T>, value: T){
        if(!this.type) throw new ReferenceError("Permutation without states can't have states defined.");
        if(!(blockState.id in this.type.states.names)) throw new ReferenceError("Unknown state for this type of block_permutation: " + blockState.id);
        // eslint-disable-next-line valid-typeof
        if(blockState.typeOf !== typeof this.type.states.defualtValues[this.states.length]) throw new TypeError("BlockState doesn't match states of block type or this permutation already has all states defined.");
        this.states.push(value);
    }
    public build(){return this.permutation; }
    public registry(reg: Registry): void {if(!this.permutation.uniqueId) SetUniqueIdFor(this.permutation); reg.registryBlockPermutation(this.build());}
}
export class BlockStateTypeBuilder<T extends boolean | number | string> extends RegistryBuilder{
    public readonly typeId: string;
    public readonly validValues: Set<T> = new Set();
    public readonly blockStateType;
    public constructor(typeId: string, kind: TypeMap<T>){
        super();
        this.typeId = typeId;
        this.blockStateType = ConstructBlockStateType(typeId, kind, this.validValues);
    }
    public addValidType(value: T){ this.validValues.add(value); return this; }
    public build(){return this.blockStateType;}
    public registry(reg: Registry): void {reg.registryBlockStateType(this.build());}
}
/**
 * let state = TryGetBlockStateType(id);
 * if(state){
 * if(type === state.typeOf) throw new TypeError("Can't marge states with different types [" + [state.typeOf, type].join(" ,") + "]");
 * const values = GetValidValues(id);
 * for(const v of validValues) values?.add(v);
 * return state;
 * }else{
 * state = ConstructBlockStateType(id, type, new Set(validValues));
 * const blockStates = (BlockStateTypes as any).TYPES as Map<string, BlockStateType>;
 * blockStates.set(id, state);
 * return state;
 * }
 */
