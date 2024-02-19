import fs from "node:fs";
import { BinaryStream, Game, LightNBT, StringifiedNBT } from "@bedrock/server";

const game = new Game(649, "1.20.60");
game.Start().then(console.log.bind(null, "Server Succesfully started:")).catch(console.error);
game.onPlayerJoin.subscribe((data)=>{
	console.log("Player joined, name:", data.player.name, "xuid:", data.player.xuid, "\n\n");
});
game.onPlayerSpawn.subscribe((data)=>{
	console.log("Player spawned, name:", data.player.name, "xuid:", data.player.xuid, "\n\n");
});
/*
const str = new BinaryStream(fs.readFileSync("canonical_block_states.nbt"));
while(!str.cursorAtEnd()){
	console.log(StringifiedNBT.Stringify(LightNBT.ReadRootTag(str), "  "));
}
*/
