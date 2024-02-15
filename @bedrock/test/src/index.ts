import { Game } from "@bedrock/server";

const game = new Game(560, "1.20.50");
game.Start().then(console.log.bind(null, "Server Succesfully started:")).catch(console.error);
