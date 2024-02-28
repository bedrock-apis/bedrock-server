import {readFileSync} from "node:fs";
import {BetterFlat, DimensionTypes, Engine, VanillaDimensionTypeId, LoaderType} from "@bedrock/server";

Engine.LoadResource(LoaderType.BlockDefinitions,readFileSync("data/canonical_block_states.nbt"));
Engine.LoadResource(LoaderType.ItemDefinitions,readFileSync("data/start_game.bin"));
const engine = new Engine();
engine.world.createDimension("bedrock:dimension", DimensionTypes.get(VanillaDimensionTypeId.Overworld)!, BetterFlat.BasicFlat());
engine.server.Start({
	address:"0.0.0.0",
	protocol: 649,
});
console.log("Server started!");
