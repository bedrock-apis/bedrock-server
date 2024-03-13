import { readFileSync, writeFileSync } from "node:fs";
import { DimensionTypes, Engine, VanillaDimensionTypeId, protocol, LoaderType, PerlinGenerator, Plugin, EntityComponentId } from "@bedrock/server";

const {ModalFormRequestPacket, ToastRequestPacket} = protocol;

class Player1 extends Plugin.getClass("Player"){
	public _onTextReceived<T extends { message: string; sourceName: string; }>(options: T): T | undefined {
		options.sourceName = `§4${options.sourceName}§r`;
		const r = new ModalFormRequestPacket();
		r.formId = 654;
		r.jsonPayload = JSON.stringify({title: "Lmao", type: "modal", content:"Lmao just testing rn", button1: "Hello", button2: "hello2"});
		this.engine.runTimeout(()=>this._onUpdate(r), 200);
		return super._onTextReceived(options);
	}
	public _onReady(): void {
		const component = this.getComponent(EntityComponentId.Health)!;
		component.effectiveMax = 40;
		super._onReady();
		const toast = new ToastRequestPacket();
		toast.title = "§eYour are welcome " + this.name;
		toast.message = "Build, mine, travel, anything you want! You can visit our discord as well.";
		this._onUpdate(toast);
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
	new PerlinGenerator(0, 1, 80,  4.236_489_301_935 * 5),
);
engine.Start({
	address: "0.0.0.0",
	protocol: 649,
});


console.log("Server started!");


/*
const protocol = JSON.parse(readFileSync("protocol.json").toString("utf8"));
GenerateProtocol(protocol);
*/
