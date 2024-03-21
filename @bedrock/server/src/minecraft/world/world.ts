import type { GameInitializePacket } from "@bedrock/protocol";
import { defualtGameInitializePacket } from "../../types/constants/GamePacket.js";
import type { DimensionType } from "../dimensions/dimension-type.js";
import type { Dimension } from "../dimensions/dimension.js";
import { ConstructDimension } from "../dimensions/dimension.js";
import type { Engine } from "../engine.js";
import type { TerrainGenerator } from "../generators/Generator.js";
import type { Player } from "../players/player.js";
import { ItemTypes } from "../public.js";

export class World {
	public readonly engine;
	public readonly tickDistance = 4;
	protected readonly game_properties: GameInitializePacket;
	protected _dimensions = new Map<string, Dimension>();
	protected _validDimensions = new WeakSet<Dimension>();
	protected _defualtDimension?: Dimension;
	public readonly postables;
	public readonly seed: bigint = 1n;
	public getDimensions(): Dimension[] {
		return [...this._dimensions.values()];
	}
	public getDimension(id: string): Dimension | undefined {
		return this._dimensions.get(id);
	}
	public createDimension(id: string, dimensionType: DimensionType, generator: TerrainGenerator) {
		const dimesnion = ConstructDimension(this, id, dimensionType, generator);
		this._validDimensions.add(dimesnion);
		this._dimensions.set(id, dimesnion);
		return dimesnion as Dimension;
	}
	public removeDimension(id: string) {
		const that = this._dimensions.get(id);
		if (that) {
			this._dimensions.delete(id);
			this._validDimensions.delete(that);
			return true;
		}

		return false;
	}
	public setDefualtDimension(dimension: Dimension | undefined) {
		if (!dimension) this._defualtDimension = undefined;
		else if (this._validDimensions.has(dimension as Dimension)) this._defualtDimension = dimension;
		else throw new ReferenceError("Invalid dimension");
	}
	public getDefualtDimension(): Dimension | undefined {
		return this._defualtDimension ?? [...this._dimensions.values()][0];
	}
	public constructor(engine: Engine) {
		this.engine = engine;
		this.postables = engine.postables;
		this.game_properties = defualtGameInitializePacket;
		this.game_properties.itemStates = [...ItemTypes.getAll()];
	}
	public buildStartGamePacket(player: Player) {
		const packet = this.game_properties as GameInitializePacket;
		packet.playerGamemode = player.gameMode;
		packet.playerPosition = player.location;
		packet.rotation = player.rotation;
		packet.entityId = player.id;
		packet.runtimeEntityId = player.runtimeId;
		packet.dimension = player.dimension.type.runtimeId;
		packet.seed = this.seed;
		packet.gamerules = [
			{
				name: "commandblockoutput",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "dodaylightcycle",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "doentitydrops",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "dofiretick",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "recipesunlock",
				editable: true,
				type: 1,
				value: false,
			},
			{
				name: "dolimitedcrafting",
				editable: true,
				type: 1,
				value: false,
			},
			{
				name: "domobloot",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "domobspawning",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "dotiledrops",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "doweathercycle",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "drowningdamage",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "falldamage",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "firedamage",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "keepinventory",
				editable: true,
				type: 1,
				value: false,
			},
			{
				name: "mobgriefing",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "pvp",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "showcoordinates",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "naturalregeneration",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "tntexplodes",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "sendcommandfeedback",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "maxcommandchainlength",
				editable: true,
				type: 2,
				value: 65_535,
			},
			{
				name: "doinsomnia",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "commandblocksenabled",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "randomtickspeed",
				editable: true,
				type: 2,
				value: 1,
			},
			{
				name: "doimmediaterespawn",
				editable: true,
				type: 1,
				value: false,
			},
			{
				name: "showdeathmessages",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "functioncommandlimit",
				editable: true,
				type: 2,
				value: 10_000,
			},
			{
				name: "spawnradius",
				editable: true,
				type: 2,
				value: 10,
			},
			{
				name: "showtags",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "freezedamage",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "respawnblocksexplode",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "showbordereffect",
				editable: true,
				type: 1,
				value: true,
			},
			{
				name: "playerssleepingpercentage",
				editable: true,
				type: 2,
				value: 100,
			},
		];
		packet.experimentalGameplayOverride = true;
		packet.experiments = [
			{enabled: true, name: "armadilo"},
			{enabled: true, name: "updateAnnouncedLive2023"},
			{enabled: true, name: "experiments_ever_used"},
			{enabled: true, name: "saved_with_toggled_experiments"}
		];
		return packet;
	}
}
