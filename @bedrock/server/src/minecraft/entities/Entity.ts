import { Vec3} from "@bedrock/base";
import type { Vector2, Vector3 } from "@bedrock/base";
import { MetadataEntry, MetadataFlags, MetadataKey, MetadataType, UpdateEntityDataPacket } from "@bedrock/protocol";
import type { Postable } from "../../types/postable.js";
import type { Dimension } from "../dimensions/dimension.js";
import type { World } from "../world/world.js";
import type { EntityBehavior } from "./EntityBehavior.js";
import type { Component } from "./component.js";
import type { EntityType } from "./entity-type.js";
import { FloatMetadata, MainFlagsMetadata, StringMetadata, type EntityMetadata } from "./metadata.js";

let entityIds = -5_468_466_546n;
let runtimeIds = -5_468_466_546n;
export class Entity{
	public readonly _metadataPacket = new UpdateEntityDataPacket();
	public readonly postables;
	public get typeId(){return this.type.id;};
	public get blockLocation(){ const {x,y,z} = this.location; return Vec3(Math.trunc(x), Math.trunc(y), Math.trunc(z)); }
	protected readonly _components = new Map<string, Component>();
	protected readonly _metadata = {
		[MetadataKey.Flags]: new MainFlagsMetadata(MetadataFlags.AffectedByGravity | MetadataFlags.Breathing | MetadataFlags.HasCollision),
		[MetadataKey.Scale]: new FloatMetadata(MetadataKey.Scale, 1),
		[MetadataKey.FallDamageMultiplier]: new FloatMetadata(MetadataKey.FallDamageMultiplier, 1),
		[MetadataKey.Nametag]: new StringMetadata(MetadataKey.Nametag, "")
	};
	public get isSneaking(){return this._metadata[MetadataKey.Flags].Sneaking;}
	public set isSneaking(v){this.setMetadataFlag("Sneaking", v);}
	public get isAffectedByGravity(){return this._metadata[MetadataKey.Flags].AffectedByGravity;}
	public set isAffectedByGravity(v){this.setMetadataFlag("AffectedByGravity", v);}
	public get nameTag(){return this._metadata[MetadataKey.Nametag].value;}
	public set nameTag(v){this.setMetadata(MetadataKey.Nametag, v);}
	public readonly location: Vector3;
	public readonly rotation: Vector2;
	public readonly dimension: Dimension;
	public readonly world: World;
	public readonly type: EntityType;
	public readonly behavior: EntityBehavior;
	public readonly id: bigint = entityIds++;
	public readonly runtimeId: bigint = runtimeIds++;
	public getComponent(componentId: string){ return this._components.get(componentId); }
	public getComponents(){ return [...this._components.values()]; }
	public isValid(){return true;}
	public constructor(type: EntityType, dimension: Dimension, behavior = type.behavior){
		this.type = type;
		this.postables = dimension.postables;
		this.dimension = dimension;
		this.behavior = behavior.clone();
		this.location = new Vec3();
		this.rotation = {x:0,y:0};
		this.world = dimension.world;
		this._metadataPacket.runtimeEntityId = this.runtimeId;
		this._metadataPacket.metadata = Object.keys(this._metadata).map((e)=>this._metadata[e as "0"]);
	}
	protected setMetadata<T extends keyof Entity["_metadata"]>(key: T, value: Entity["_metadata"][T]["value"]){
		this.postables.add(this._metadataPacket);
		this._metadata[key].value = value;
	}
	protected setMetadataFlag<T extends keyof typeof MetadataFlags>(key: T, value: boolean){
		this.postables.add(this._metadataPacket);
		this._metadata[MetadataKey.Flags][key] = value;
	}
}
