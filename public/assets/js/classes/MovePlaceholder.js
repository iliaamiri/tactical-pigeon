import Move from './Move.js';

class MovePlaceholder {
    checked = false;

    #bodyPartType;

    #moveType;

    target;

    constructor(bodyPartType, selectedMoveType, target) {
        this.moveType = selectedMoveType;
        this.target = target;
        this.bodyPartType = bodyPartType;
    }

    get bodyPartType() { return this.#bodyPartType; }
    set bodyPartType(newBodyPartType) {
        this.#bodyPartType = newBodyPartType;
        this.changeMove(this.moveType);
    }

    get moveType() { return this.#moveType; }
    set moveType(newMoveType) {
        if (Move.moveTypeEnum.includes(newMoveType)) {
            this.#moveType = newMoveType;
        }
    }

    changeMove(newMove) {
        Move.myMoves[this.bodyPartType] = newMove;
    }

    check() {
        this.checked = !this.checked;

        if (this.checked) {
            /* do stuff as if it's ON */
            this.target.classList.add(`filled-${this.moveType}`);
        } else {
            /* do stuff as if it's OFF */
            console.log("ay?")
            this.target.classList.remove(`filled-${Move.moveTypeEnum[0]}`, `filled-${Move.moveTypeEnum[1]}`);
            this.changeMove(null);
        }
    }

    static all = {};
}

export default MovePlaceholder;