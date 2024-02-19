import { Vec3, type Vector3 } from "@bedrock/base";
import { AttributeComponentIds, GameMode } from "../../types";
import { Entity, EntityType } from "./Entity";
import type { PlayerClient } from "./PlayerClient";

export const playerType = new EntityType(
	"minecraft:player",
	[
		AttributeComponentIds.Absorption,
		AttributeComponentIds.Luck,
		AttributeComponentIds.FallDamage,
		AttributeComponentIds.Health,
		AttributeComponentIds.KnockbackResistence,
		AttributeComponentIds.Movement,
		AttributeComponentIds.LavaMovement,
		AttributeComponentIds.UnderwaterMovement,
		AttributeComponentIds.AttackDamage,
		AttributeComponentIds.PlayerExhaustion,
		AttributeComponentIds.PlayerExperience,
		AttributeComponentIds.PlayerHunger,
		AttributeComponentIds.PlayerLevel,
		AttributeComponentIds.PlayerSaturation
	]
);
export class Player extends Entity{
	public readonly client;
	public headYaw = 0;
	public gamemode = GameMode.Creative;
	public constructor(client: PlayerClient){
		super(client.engine.GetNewEntityId(), playerType);
		this.client = client;
	}
	public get headLocation(): Vector3{ return  Vec3(this.location.z,this.location.y + 1.62,this.location.z); }
	public set headLocation(v){ this.location.y = v.y - 1.26; this.location.x = v.x; this.location.z = v.z;}
	public get abilities(){return this.client.abilities;}
	public get name(){return this.client.name;};
	public get xuid(){return this.client.xuid;};
	public sendMessage(message: string){ this.client.sendMessage(message); }
}
