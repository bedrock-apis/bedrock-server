import fs from "node:fs";
import { BinaryStream, Game, LightNBT, StringifiedNBT } from "@bedrock/server";

const game = new Game(649, "1.20.60");
game.Start().then(console.log.bind(null, "Server Succesfully started:")).catch(console.error);
/*
const str = new BinaryStream(fs.readFileSync("canonical_block_states.nbt"));
while(!str.cursorAtEnd()){
	console.log(StringifiedNBT.Stringify(LightNBT.ReadRootTag(str), "  "));
}
*/
