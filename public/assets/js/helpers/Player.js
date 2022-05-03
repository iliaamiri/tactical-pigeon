import RoundMove from "./RoundMove.js";

class Player {
    // ID of the player : String
    playerId;

    // Name of the player which will be displayed : String
    playerName;

    // Set of moves of the player : RoundMove
    moves = new RoundMove();

    constructor(playerId, playerName) {
        this.playerId = playerId;
        this.playerName = playerName;
    }

    /**
     * Resets all the moves of the player. Makes it ready for next rounds
     */
    resetMoves() {
        this.moves = new RoundMove();
    }
}

export default Player;