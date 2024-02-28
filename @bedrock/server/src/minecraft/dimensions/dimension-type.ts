import { DimensionType as DT } from "@bedrock/protocol";
import { Type, Types } from "../base/Types.js";

export enum DimensionTypeMapping {
	"minecraft:overworld",
	"minecraft:nether",
	"minecraft:the_end",
};
export class DimensionType extends Type{
	public readonly runtimeId: number;
	public constructor(id: string, runtimeId: number){ super(id); this.runtimeId = runtimeId; }
}
export class DimensionTypes extends Types<DimensionType>{
	protected static TYPES: Map<string, DimensionType> = new Map();
}
Object.values(DT).filter(e=>typeof e === "number").map((t: any)=>{
	return (DimensionTypes as any).TYPES.set(DimensionTypeMapping[t]??"minecraft:overworld", new DimensionType(DimensionTypeMapping[t]??"minecraft:overworld", t));
});
