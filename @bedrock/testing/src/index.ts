import { readFileSync, writeFileSync } from "node:fs";
import { DimensionTypes, Engine, VanillaDimensionTypeId, LoaderType, PerlinGenerator, Plugin } from "@bedrock/server";

class Player extends Plugin.getClass("Player"){
	public _onTextReceived<T extends { message: string; sourceName: string; }>(options: T): T | undefined {
		options.sourceName = `§2${options.sourceName}§r`;
		return super._onTextReceived(options);
	}
}
class MyPlugin extends Plugin{
	public constructor(){
		super();
		this.registryClassPlugin(Player);
	}
}
const engine = new Engine();
engine.registryPlugin(new MyPlugin());
engine.world.createDimension(
	"bedrock:dimension",
	DimensionTypes.get(VanillaDimensionTypeId.Overworld)!,
	new PerlinGenerator(0, 0.6, 50),
);
engine.Start({
	address: "0.0.0.0",
	protocol: 649,
});

Engine.LoadResource(LoaderType.BlockDefinitions, readFileSync("data/canonical_block_states.nbt"));
Engine.LoadResource(LoaderType.ItemDefinitions, readFileSync("data/" + LoaderType.ItemDefinitions));
Engine.LoadResource(LoaderType.CreativeItems, readFileSync("data/" + LoaderType.CreativeItems));

console.log("Server started!");


/*
const protocol = JSON.parse(readFileSync("protocol.json").toString("utf8"));
GenerateProtocol(protocol);
*/
