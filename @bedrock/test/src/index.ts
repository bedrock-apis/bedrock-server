import fs from "node:fs";
import { BinaryStream, Game, LightNBT, StringifiedNBT } from "@bedrock/server";

const game = new Game(560, "1.20.50");
game.Start().then(console.log.bind(null, "Server Succesfully started:")).catch(console.error);

const str = new BinaryStream(fs.readFileSync("canonical_block_states.nbt"));
while(!str.cursorAtEnd()){
	console.log(StringifiedNBT.Stringify(LightNBT.ReadRootTag(str), "  "));
}
