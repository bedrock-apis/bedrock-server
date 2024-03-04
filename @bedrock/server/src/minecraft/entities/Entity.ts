import { Vec3 } from "@bedrock/base";
import type { Vector2, Vector3 } from "@bedrock/base";
import { UpdateEntityDataPacket } from "@bedrock/protocol";
import type { Dimension } from "../dimensions/dimension.js";
import type { World } from "../world/world.js";
import type { EntityComponent } from "./BaseComponents.js";
import type { EntityBehavior } from "./EntityBehavior.js";
import type { ComponentMapInstances } from "./EntityComponents.js";
import { EntityDatas } from "./EntityData.js";
import type { EntityType } from "./entity-type.js";

let entityIds = -5_468_466_546n;
let runtimeIds = -5_468_466_546n;
export class Entity {
	/**
	 * Protected
	 */
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	public readonly entityData = new EntityDatas(this);
	protected readonly _components = new Map<string, EntityComponent<string>>();
	protected readonly _metadataPacket;

	/**
	 * Public
	 */

	public readonly postables;
	public get typeId() {
		return this.type.id;
	}
	public get blockLocation() {
		const { x, y, z } = this.location;
		return Vec3(Math.trunc(x), Math.trunc(y), Math.trunc(z));
	}
	public readonly location: Vector3;
	public readonly rotation: Vector2;
	public readonly dimension: Dimension;
	public readonly world: World;
	public readonly type: EntityType;
	public readonly behavior: EntityBehavior;
	public readonly id: bigint = entityIds++;
	public readonly runtimeId: bigint = runtimeIds++;
	public getComponent<T extends keyof ComponentMapInstances>(
		componentId: T | string,
	): ComponentMapInstances[T] | undefined {
		return this._components.get(componentId) as any;
	}
	public getComponents() {
		return [...this._components.values()];
	}
	public hasComponent<T extends string>(componentId: T) {
		return this._components.has(componentId);
	}
	public isValid() {
		return true;
	}
	public constructor(type: EntityType, dimension: Dimension, behavior = type.behavior) {
		this.type = type;
		this.postables = dimension.postables;
		this.dimension = dimension;
		this.behavior = behavior.clone();
		this.location = new Vec3(0, 250, 0);
		this.rotation = { x: 0, y: 0 };
		this.world = dimension.world;
		this.behavior.buildEntity(this, this._components, (this._metadataPacket = new UpdateEntityDataPacket()));
		this._metadataPacket.runtimeEntityId = this.runtimeId;
		this._metadataPacket.tick = 0n;
	}
}
