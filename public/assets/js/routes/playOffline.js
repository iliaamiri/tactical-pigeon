// Component classes
import MovePlaceholder from '../components/MovePlaceholder.js';
import AmmoInventory from "../components/Inventories/AmmoInventory.js";
import Timer from '../components/Timer.js';
import Tally from "../components/Tally.js";

// Helpers
import Game from "../helpers/Game.js";
import Player from "../helpers/Player.js";
import Players from "../helpers/Players.js";
import BotPlayer from "../helpers/BotPlayer.js";
import RoundMove from "../helpers/RoundMove.js";
import changeRoundTitle from "../helpers/changeRoundTitle.js";
import roundCountdown from "../helpers/roundCountdown.js";

// Core and Utils
import { sounds } from "../core/sounds.js";

// Auth
import Token from "../io/auth/Token.js";

// Fetch username from cookie
export let username = Token.fetchCachedUsernameOnly();

// Inserting the username into the blue banner on the intro overlay
let blueBannerUsernameSpan = document.querySelector('div.blueBanner p.character');
if (username !== null) {
  blueBannerUsernameSpan.innerHTML = `Hi ${username},<br>you are: PUSINESS MAN`;
}

// inserting the username and 'computer' under the health bars
let myUsernameSpan = document.querySelector('div.my-username-div span.my-username-span');
myUsernameSpan.innerHTML = username;
let opponentUsernameSpan = document.querySelector('div.opponent-username-div span.opponent-username-span');
opponentUsernameSpan.innerHTML = 'computer';  

//Initiating the game.
Game.currentGame = new Game("offline_game");
// Round.all.game1 = new Round();

// Initiating the players.
Players.all.player1 = new Player("AklBm4", {
  'blocks': AmmoInventory.all['block-left'],
  'attacks': AmmoInventory.all['attack-left']
});
Players.all.player2 = new BotPlayer();

// Initiating the move placeholders.
MovePlaceholder.all = {
  'head': new MovePlaceholder('head'),
  'body': new MovePlaceholder('body'),
  'legs': new MovePlaceholder('legs')
};

// Initiating the tallies.
Tally.all = {
  'player1': new Tally(document.querySelector('table.tally.my-tally'), Players.all.player1),
  'player2': new Tally(document.querySelector('table.tally.opponent-tally'), Players.all.player2)
};
Tally.all.player1.currentTallyColumnNumber = Game.currentGame.currentRound.currentRoundNumber + 1;

await import('./_common_play.js');