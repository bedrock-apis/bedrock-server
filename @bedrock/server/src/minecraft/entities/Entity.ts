import type { Vector2, Vector3 } from "@bedrock/base";
import { Vec3 } from "@bedrock/base";
import { AttributeComponent } from "../../types";

let runtimeEntityIds = 1n;
export class EntityType {
	public readonly id;
	public readonly validAttributes; 
	public constructor(typeId: string, attributeComponents: string[]){
		this.id = typeId;
		this.validAttributes = attributeComponents;
	}
}
export class Entity{
	public nameTag = "";
	public location: Vector3 = Vec3(0,-45,0);
	public rotation: Vector2 = {x:0,y:0};
	public isOnGround = false;
	public dimension = 0;
	public readonly id;
	public readonly runtimeId = runtimeEntityIds++;
	public readonly type;
	public readonly attributes: {[K: string]: AttributeComponent;} = {};
	public get typeId(){return this.type.id;}
	public constructor(id: bigint, entityType: EntityType){ 
		this.id = id; this.type = entityType; 
		for (const attribute_name of entityType.validAttributes) {
			this.attributes[attribute_name] = new AttributeComponent(attribute_name);
		}
	}
}
