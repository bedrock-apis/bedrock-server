import type { Client } from "../../network/index.js";
import type { Postable } from "../../types/postable.js";
import type { Entity } from "../entities/index.js";
import type { Player } from "./public.js";

export class ContextArea {
	public readonly range;
	public readonly entities = new Set<Entity>();
	public readonly player: Player;
	public readonly client: Client;
	protected readonly _updateHandler: (e: Entity, p: Postable) => void;
	public readonly updates = new Set<Postable>();
	public constructor(player: Player) {
		this.range = player.world.tickDistance;
		this.player = player;
		this.client = player.client;
		this._updateHandler = (e, p) => this.updates.add(p);
		this.player.onUpdate.subscribe(this._updateHandler);
	}
	public addEntity(entity: Entity) {
		entity.onUpdate.subscribe(this._updateHandler);
	}
	public removeEntity(entity: Entity) {
		if (this.entities.delete(entity)) entity.onUpdate.unsubscribe(this._updateHandler);
	}
	public _onTick() {
		if (this.updates.size) {
			this.client.post(this.updates);
			this.updates.clear();
		}
	}
}
