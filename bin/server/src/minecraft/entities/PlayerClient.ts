import { GameMessageType } from "../../communcation";
import { Abilities, PermissionLevel } from "../../types";
import type { Engine } from "../core";
import { Player } from "./Player";

export class PlayerClient {
	public readonly player;
	public readonly xuid;
	public readonly uuid;
	public readonly engine;
	public readonly name;
	public readonly abilities = new Abilities();
	public get port(){return this.engine.port;}
	public isHost!: boolean;
	public constructor(engine: Engine, xuid: string, name: string, uuid: bigint){
		this.engine = engine;
		this.xuid = xuid;
		this.uuid = uuid;
		this.name = name;
		this.player = new Player(this);
		this.abilities.permissionLevel = PermissionLevel.Operator;
	}
	public sendMessage(message: string){
		this.engine.port.Post(GameMessageType.SendMessage, {uuid: this.uuid, message});
	}
}
