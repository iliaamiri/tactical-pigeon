// Helpers
import Game from "../helpers/Game.js";
import MovePlaceholder from "../components/MovePlaceholder.js";
import clientSocket from "../io/client.js";

const socket = clientSocket();

// Load the game

// Check if there are caches to load from
let cacheFound = Game.findByGameId(gameId);
if (!cacheFound) { // If not, fetch information from the server.
    // Initiate the game.
    new Game(gameId);

    // initiate everything from the beginning
    Game.initiate(gameId, myUsername, opponentUsername);
}

// Initiating the move placeholders.
MovePlaceholder.all = {
    'head': new MovePlaceholder('head'),
    'body': new MovePlaceholder('body'),
    'legs': new MovePlaceholder('legs')
};