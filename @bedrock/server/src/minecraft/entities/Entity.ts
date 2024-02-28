import { Vec3} from "@bedrock/base";
import type { Vector2, Vector3 } from "@bedrock/base";
import type { Dimension } from "../dimensions/dimension.js";
import type { World } from "../world/world.js";
import type { EntityBehavior } from "./EntityBehavior.js";
import type { EntityType } from "./entity-type.js";

let entityIds = -5_468_466_546n;
let runtimeIds = -5_468_466_546n;
export class Entity{
	public get typeId(){return this.type.id;};
	public readonly location: Vector3;
	public readonly rotation: Vector2;
	public readonly dimension: Dimension;
	public readonly world: World;
	public readonly type: EntityType;
	public readonly behavior: EntityBehavior;
	public readonly id: bigint = entityIds++;
	public readonly runtimeid: bigint = runtimeIds++;
	public constructor(type: EntityType, dimension: Dimension, behavior = type.behavior){
		this.type = type;
		this.dimension = dimension;
		this.behavior = behavior.clone();
		this.location = new Vec3();
		this.rotation = {x:0,y:0};
		this.world = dimension.world;
	}
}
