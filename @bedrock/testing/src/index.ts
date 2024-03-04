import { readFileSync } from "node:fs";
import { DimensionTypes, Engine, VanillaDimensionTypeId, LoaderType, PerlinGenerator } from "@bedrock/server";

Engine.LoadResource(LoaderType.BlockDefinitions, readFileSync("data/canonical_block_states.nbt"));
Engine.LoadResource(LoaderType.ItemDefinitions, readFileSync("data/start_game.bin"));
const engine = new Engine();
engine.world.createDimension(
	"bedrock:dimension",
	DimensionTypes.get(VanillaDimensionTypeId.Overworld)!,
	new PerlinGenerator(0, 0.5, 30),
);
engine.server.Start({
	address: "0.0.0.0",
	protocol: 649,
});
console.log("Server started!");
