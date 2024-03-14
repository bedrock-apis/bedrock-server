import { readFileSync, writeFileSync } from "node:fs";
import { DimensionTypes, Engine, VanillaDimensionTypeId, protocol, LoaderType, PerlinGenerator, Plugin, EntityComponentId, GameMode, MessageFormData, CancelationReason } from "@bedrock/server";

class Player1 extends Plugin.getClass("Player"){
	public _onTextReceived<T extends { message: string; sourceName: string; }>(options: T): T | undefined {
		options.sourceName = `§4${options.sourceName}§r`;
		this.engine.runTimeout(async ()=>{
			const data = await new MessageFormData("Your message: " + options.message,"Title").show(this);
			if(data.canceled) console.log("Canceled: " + CancelationReason[data.cancelationReason!]);
			else console.log("Selection: " + data.selection);
		}, 200);
		return super._onTextReceived(options);
	}
	public _onReady(): void {
		const component = this.getComponent(EntityComponentId.Health)!;
		component.effectiveMax = 40;
		super._onReady();
		this.sendToastPopup("§eYour are welcome " + this.name, "Build, mine, travel, anything you want! You can visit our discord as well.");
		this.sendMessage("Testing message send");
	}
	public _onInit(): void {
		(this as any).gameMode = GameMode.Creative;
	}
}
class MyPlugin extends Plugin{
	public constructor(){
		super();
		this.registryClassPlugin(Player1);
	}
}
Engine.registryPlugin(new MyPlugin());
const engine = new Engine();
Engine.LoadResource(LoaderType.BlockDefinitions, readFileSync("data/canonical_block_states.nbt"));
Engine.LoadResource(LoaderType.ItemDefinitions, readFileSync("data/" + LoaderType.ItemDefinitions));
Engine.LoadResource(LoaderType.CreativeItems, readFileSync("data/" + LoaderType.CreativeItems));
engine.world.createDimension(
	"bedrock:overworld",
	DimensionTypes.get(VanillaDimensionTypeId.Overworld)!,
	new PerlinGenerator(0, 1, 40,  4.236_489_301_935 * 3),
);
engine.Start({
	address: "0.0.0.0",
	protocol: 649,
});
console.log("Server started!");
