import { Float } from "@bedrock/base";
import { MetadataKey } from "@bedrock/protocol";
import type { Entity } from "./entity.js";

export class InternalMetadata{
	public readonly entity;
	public readonly map: {[k: number]: any} = {};
	public constructor(entity: Entity){
		this.entity = entity;
	}
}
export class LongFlags{}
export const MetadataTypeMapping = {
	[MetadataKey.Flags]: LongFlags,
	[MetadataKey.Nametag]: String,
	[MetadataKey.FallDamageMultiplier]: Float,
};
