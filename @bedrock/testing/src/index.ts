import { readFileSync, writeFileSync } from "node:fs";
import { Vec3 } from "@bedrock/base";
import type { Player } from "@bedrock/server";
import { BlockPermutation , DimensionTypes, Engine, VanillaDimensionTypeId, LoaderType, PerlinGenerator, Plugin, EntityComponentId, GameMode, MessageFormData, CancelationReason, ActionFormData, protocol } from "@bedrock/server";

class Updater {
	public location: Vec3;
	public blockPermutation: BlockPermutation;
	public constructor(block: BlockPermutation, loc: Vec3){
		this.blockPermutation = block;
		this.location = loc;
	}
	public tick(player: Player){
		const direction = Vec3.subtract(player.location, Vec3.add(this.location, {x:0,y:1,z:0})).normalized.multiply(0.23);
		this.location = this.location.add(direction);
		const updateBlock = protocol.UpdateBlockPacket.From(this.location.floor(), this.blockPermutation.runtimeId, 0);
		player.context.updates.add(updateBlock);		
	}
}
class Player1 extends Plugin.getClass("Player"){
	public updater!: Updater;
	public _onTextReceived<T extends { message: string; sourceName: string; }>(options: T): T | undefined {
		options.sourceName = `§4${options.sourceName}§r`;
		this.engine.runTimeout(async ()=>{
			const data = await new ActionFormData("Title: " + this.name, "Your message: " + options.message).button("Lmao","textures/items/apple").show(this);
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
	}
	public _onInit(): void {
		this.updater = new Updater(BlockPermutation.resolve("diamond_block"), Vec3.from(this.location));
		(this as any).gameMode = GameMode.Creative;
	}
	public _onTick(): void {
		super._onTick();
		// this.updater.tick(this);
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
	new PerlinGenerator(0, 1, 80,  4.236_489_301_935 * 6),
);
engine.Start({
	address: "0.0.0.0",
	protocol: 649,
});
console.log("Server started!");
