import { GameMode } from "@bedrock/protocol";
import type { Client } from "../../network/Client.js";
import type { Postable } from "../../types/postable.js";
import type { Dimension } from "../dimensions/dimension.js";
import { Entity } from "../entities/entity.js";
import { InternalAbilities, type Abilities } from "./abilities.js";
import { playerType } from "./type.js";


export abstract class Player extends Entity{
	public abstract isValid(): boolean;
	public abstract setGameMode(gameMode: GameMode): void;
	public abstract readonly abilities: Abilities;
	public readonly client;
	public readonly name;
	public readonly gameMode = GameMode.Creative;
	public readonly updates = new Set<Postable>();
	protected constructor(dimension: Dimension, client: Client){
		super(playerType, dimension);
		this.client = client;
		this.name =this.client.displayName;
	}
}
export class InternalPlayer extends Player{
	public readonly engine;
	public readonly abilities: InternalAbilities;
	public isValid(): boolean { return this.engine.players.has(this); };
	public updateAll(){ this.updates.add(this.abilities); }
	public updateMe(me: Postable){ if(this.isValid()) this.updates.add(me); }
	public constructor(dimension: Dimension, client: Client){ 
		super(dimension, client);
		this.abilities = new InternalAbilities(this);
		this.engine = this.world.engine;
	}
	public setValid(v?: boolean){
		this.abilities._isValid = v??false;
	}
	public setGameMode(gameMode: GameMode){
		(this as any).gameMode = gameMode;
		// TODO:
		// Update via Gamemode Change Packet
		
	}
}
