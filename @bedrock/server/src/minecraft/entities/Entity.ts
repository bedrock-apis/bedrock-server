import { Vec3 } from "@bedrock/base";
import type { Vector2, Vector3 } from "@bedrock/base";
import type { MetadataEntry } from "@bedrock/protocol";
import { UpdateEntityDataPacket } from "@bedrock/protocol";
import type { Postable } from "../../types/index.js";
import { PublicEvent, TriggerEvent } from "../../types/index.js";
import type { Dimension } from "../dimensions/dimension.js";
import type { World } from "../world/world.js";
import type { EntityComponent } from "./BaseComponents.js";
import type { EntityBehavior } from "./EntityBehavior.js";
import { EntityComponentId, type ComponentMapInstances } from "./EntityComponents.js";
import { EntityDatas } from "./EntityData.js";
import type { EntityType } from "./entity-type.js";

let entityIds = -5_468_466_546n;
let runtimeIds = -5_468_466_546n;
export class Entity {
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	public readonly entityData = new EntityDatas(this);
	/**
	 * Protected
	 */
	protected readonly _components = new Map<string, EntityComponent<string>>();
	protected readonly _metadatas = new Set<MetadataEntry>();
	protected readonly _metadataPacket;
	protected readonly _allMetadatas;
	protected readonly _status;
	/**
	 * Public
	 */
	public get typeId() {
		return this.type.id;
	}
	public get blockLocation() {
		const { x, y, z } = this.location;
		return Vec3(Math.trunc(x), Math.trunc(y), Math.trunc(z));
	}
	public get isSprinting(){return this._status.isSprinting;}
	public get isGliding(){return this._status.isGliding;}
	public get isSneaking(){return this._status.isSneaking;}
	public get isFlying(){return this._status.isCanFly;}
	public location: Vector3;
	public rotation: Vector2;
	public dimension: Dimension;
	public world: World;
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
		this.dimension = dimension;
		this.behavior = behavior.clone();
		this.location = new Vec3(0, 250, 0);
		this.rotation = { x: 0, y: 0 };
		this.world = dimension.world;
		const [packet, allMetadatas] = this.behavior.buildEntity(this, this._components);
		this._metadataPacket = packet;
		this._allMetadatas = allMetadatas;
		this._status = this.getComponent(EntityComponentId.StatusProperties)!;
	}
	
	
	
	public readonly onUpdate = new PublicEvent<[Entity, Postable]>();
	public _updateAll() {
		const packet = new UpdateEntityDataPacket();
		packet.metadata = this._allMetadatas;
		packet.runtimeEntityId = this.runtimeId;
		packet.tick = 0n;
		this._onUpdate(packet);
	}
	public _onUpdate(postable: Postable) {
		TriggerEvent(this.onUpdate, this, postable).catch(console.error);
	}
	public _onTick() {}
	public _getDefaultMovement(){ return this.getComponent(EntityComponentId.Movement)?.default??0.1; }
	public _getSprintingMovement(){ return 0.04; }
}
