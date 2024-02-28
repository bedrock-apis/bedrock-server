"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@bedrock/server");
server_1.Logger.DEBUG = true;
const game = new server_1.Game(649, "1.20.60");
game.Start().then(console.log.bind(null, "Server Succesfully started:")).catch(console.error);
game.onPlayerJoin.subscribe((data) => {
    console.log("Player joined, name:", data.player.name, "xuid:", data.player.xuid, "\n\n");
});
game.onPlayerSpawn.subscribe((data) => {
    console.log("Player spawned, name:", data.player.name, "xuid:", data.player.xuid, "\n\n");
});
/*
const str = new BinaryStream(fs.readFileSync("canonical_block_states.nbt"));
while(!str.cursorAtEnd()){
    console.log(StringifiedNBT.Stringify(LightNBT.ReadRootTag(str), "  "));
}
*/
