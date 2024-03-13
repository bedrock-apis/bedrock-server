import type { Buffer } from "node:buffer";
import { LightNBT, NBTTag, Byte, Int32 } from "@bedrock/base";
import { BinaryStream } from "@serenityjs/binarystream";
import { Types } from "../base/Types.js";
import { ConstructBlockPermutationEmpty, SetTypeFor, type BlockPermutation } from "./BlockPermutation.js";
import type { BlockStateType } from "./BlockStateTypes.js";
import { BlockStateTypes, ConstructBlockStateType } from "./BlockStateTypes.js";
import type { BlockType } from "./BlockType.js";
import { ConstructBlockType } from "./BlockType.js";

// @ts-expect-error sometimes you just want to do these things
export class BlockTypes extends Types<BlockType> {
	protected static TYPES: Map<string, BlockTypes> = new Map();
	protected static readonly PERMUTATIONS: Map<number, BlockPermutation> = new Map();
}
/*
export function MapRawBlockTypes(rawBlockTypes: Buffer){
	// Create a new stream from the MAPPED_BLOCK_STATES file
	const stream = new BinaryStream(rawBlockTypes);

	// Read the root nbt tag
	const { permutations: blockTypes } = LightNBT.ReadRootTag(stream) as MappedBlockStateEntry;

	// Loop through the blocks, reading their names and IDs
	for (const key of Object.keys(blockTypes)) {
		const { name, permutations, type, id } = blockTypes[key];

		// Construct the block type
		const blockType = new MappedBlockType(name, type, permutations, id);

		// Add the block to the map
		(BlockTypes as any).TYPES.set(name, blockType);

		// Add the permutations to the map
		for (const permutation of blockType.permutations.values()) (BlockTypes as any).PERMUTATIONS.set(permutation.runtimeId, permutation);
	}
}*/

export function CanonicalBlockTypeMapper(canonical_block_states: Buffer) {
	// Create a new BinaryStream from the states buffer.
	const stream = new BinaryStream(canonical_block_states);
	let runtimeId = 0;
	const types = (BlockTypes as any).TYPES as Map<string, BlockType>;
	const permutations = (BlockTypes as any).PERMUTATIONS as Map<number, BlockPermutation>;
	const blockStates = (BlockStateTypes as any).TYPES as Map<string, BlockStateType>;
	do {
		// Read the root tag.
		const { name, states } = LightNBT.ReadRootTag(stream) as {
			name: string;
			states: Record<string, Byte | Int32 | string>;
			version: number;
		};

		// Create a runtime ID.
		const names = [] as any[];
		const values = [] as any[];
		const valueTypes = [] as any[];
		const mappedNames = {} as any;
		let index = 0;
		for (const name of Object.keys(states)) {
			names.push(name);
			const type = states[name] as any;
			switch (type[Symbol.NBT_TYPE]) {
				case NBTTag.Byte:
					values.push(Boolean(type.valueOf()));
					valueTypes.push(Byte);
					break;
				case NBTTag.Int32:
					values.push(Number(type));
					valueTypes.push(Int32);
					break;
				case NBTTag.String:
					values.push(String(type));
					valueTypes.push(String);
					break;
				default:
					throw new ReferenceError("Faild to map this type of value: " + NBTTag[type[Symbol.NBT_TYPE]]);
			}

			let bState = blockStates.get(name);
			if (!bState) {
				bState = ConstructBlockStateType(name, typeof values[index] as "string", new Set());
			}

			mappedNames[name] = index;
			blockStates.set(name, bState);
			(bState as any)._values.add(values[index]);
			index++;
		}

		const permutation = ConstructBlockPermutationEmpty(runtimeId++, values);
		permutations.set(permutation.runtimeId, permutation);

		let type = types.get(name);
		if (!type) {
			type = ConstructBlockType(name, permutation, {
				defualtValues: values,
				types: valueTypes,
				names: mappedNames,
			});
		}

		SetTypeFor(permutation, type);
		(type as any).permutations.set(permutation.uniqueId, permutation);
		types.set(name, type);
	} while (!stream.cursorAtEnd());
}
