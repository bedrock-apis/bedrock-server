import { FL32_MAX, type MetadataEntry } from "@bedrock/protocol";
import { PublicEvent, TriggerEvent } from "../../types/index.js";
import type { Entity } from "./entity.js";

export class ComponentUpdateEventData<T extends Component<string>> {
	public readonly componentId: string;
	public readonly component: T;
	public constructor(component: T) {
		this.component = component;
		this.componentId = component.componentId;
	}
}
export class EntityComponentUpdateEventData<T extends EntityComponent<string>> extends ComponentUpdateEventData<T> {
	public readonly entity: Entity;
	public constructor(component: T) {
		super(component);
		this.entity = component.entity;
	}
}
export class ComponentUpdateEvent<T extends ComponentUpdateEventData<Component<string>>> extends PublicEvent<[T]> {}
export class EntityComponentUpdateEvent<
	T extends EntityComponentUpdateEventData<EntityComponent<string>>,
> extends ComponentUpdateEvent<T> {}

export abstract class EntityComponentValueChangeEventData<
	S,
	T extends EntityComponent<string>,
> extends EntityComponentUpdateEventData<T> {
	public readonly oldValue: S;
	public newValue: S;
	public constructor(component: T, oldValue: S, newValue: S) {
		super(component);
		this.oldValue = oldValue;
		this.newValue = newValue;
	}
}
export abstract class EntityComponentValueChangeEvent<
	T extends EntityComponentValueChangeEventData<any, EntityComponent<string>>,
> extends EntityComponentUpdateEvent<T> {}
export class FloatEntityComponentValueChangeEventData<
	S extends FloatEntityComponent<string>,
> extends EntityComponentValueChangeEventData<number, S> {
	public constructor(component: S, oldValue: number, newValue: number) {
		super(component, oldValue, newValue);
	}
}
export class FloatEntityComponentValueChangeEvent<
	T extends FloatEntityComponent<string>,
> extends EntityComponentValueChangeEvent<FloatEntityComponentValueChangeEventData<T>> {}
export abstract class Component<T extends string> {
	public readonly componentId: T;
	protected constructor(componentId: T) {
		this.componentId = componentId;
	}
	public abstract isValid(): boolean;
}
export abstract class EntityComponent<T extends string> extends Component<T> {
	public readonly entity;
	public isValid() {
		return this.entity.isValid();
	}
	public readonly onUpdate: EntityComponentUpdateEvent<EntityComponentUpdateEventData<EntityComponent<T>>> =
		new EntityComponentUpdateEvent<EntityComponentUpdateEventData<EntityComponent<T>>>();
	public constructor(entity: Entity, componentId: T) {
		super(componentId);
		this.entity = entity;
	}
}
export abstract class FloatEntityComponent<T extends string> extends EntityComponent<T> {
	public get currentValue() {
		return this.entity.entityData[this.componentId + ".value"] ?? (this as any).defualt ?? 0;
	}
	public set currentValue(v) {
		const data = new FloatEntityComponentValueChangeEventData(
			this,
			this.entity.entityData[this.componentId + ".value"],
			v,
		);
		TriggerEvent(this.onUpdate, new EntityComponentUpdateEventData(this)).catch(console.error);
		TriggerEvent(this.onValueChange, data).catch(console.error);
		this.entity.entityData[this.componentId + ".value"] = data.newValue;
	}
	public readonly onValueChange = new FloatEntityComponentValueChangeEvent<this>();
}
export abstract class AttributeComponent<T extends string> extends FloatEntityComponent<T> {
	public get effectiveMax() {
		return this.entity.entityData[this.componentId + ".max"] ?? this.defaultMax;
	}
	public set effectiveMax(v) {
		const data = new FloatEntityComponentValueChangeEventData(
			this,
			this.entity.entityData[this.componentId + ".max"],
			v,
		);
		TriggerEvent(this.onUpdate, new EntityComponentUpdateEventData(this)).catch(console.error);
		TriggerEvent(this.onEffectiveMaxChange, data).catch(console.error);
		this.entity.entityData[this.componentId + ".max"] = data.newValue;
	}
	public get effectiveMin() {
		return this.entity.entityData[this.componentId + ".min"] ?? this.defaultMin;
	}
	public set effectiveMin(v) {
		const data = new FloatEntityComponentValueChangeEventData(
			this,
			this.entity.entityData[this.componentId + ".min"],
			v,
		);
		TriggerEvent(this.onUpdate, new EntityComponentUpdateEventData(this)).catch(console.error);
		TriggerEvent(this.onEffectiveMinChange, data).catch(console.error);
		this.entity.entityData[this.componentId + ".min"] = data.newValue;
	}
	public readonly onEffectiveMaxChange = new FloatEntityComponentValueChangeEvent<this>();
	public readonly onEffectiveMinChange = new FloatEntityComponentValueChangeEvent<this>();

	public get default() {
		return this.entity.behavior[this.componentId as "minecraft:health"]?.default ?? 0;
	}
	public get defaultMax() {
		return this.entity.behavior[this.componentId as "minecraft:health"]?.max ?? FL32_MAX;
	}
	public get defaultMin() {
		return this.entity.behavior[this.componentId as "minecraft:health"]?.min ?? 0;
	}
	public constructor(entity: Entity, componentId: T) {
		super(entity, componentId);
		this.currentValue = this.default;
	}
}
export interface MetadataComponent {
	getMetadata(): Iterable<MetadataEntry>;
}
