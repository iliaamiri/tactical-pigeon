import Move from './Move.js';
import Inventory from './Inventory.js';

class MovePlaceholder {
    checked = false;

    #bodyPartType;

    #moveType;

    target;

    constructor(bodyPartType, selectedMoveType, target) {
        this.moveType = selectedMoveType;
        this.target = target;
        this.movePlaced = this.moveType;
        this.bodyPartType = bodyPartType;
    }

    get bodyPartType() { return this.#bodyPartType; }
    set bodyPartType(newBodyPartType) {
        this.#bodyPartType = newBodyPartType;
        this.changeMove(this.movePlaced);
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
            if (Inventory.all[`${this.moveType}-left`].counter === 0) { // if we have no inventory left, don't do place a move
                this.checked = !this.checked;
                Move.myMoves[this.bodyPartType] = null;
            } else {
                this.target.classList.add(`filled-${this.moveType}`);
                this.movePlaced = this.moveType;
                this.changeMove(this.movePlaced);
                Inventory.all[`${this.moveType}-left`].decreaseCounter();
            }
            
        } else {
            /* do stuff as if it's OFF */
            console.log("ay?")
            this.target.classList.remove(`filled-${Move.moveTypeEnum[0]}`, `filled-${Move.moveTypeEnum[1]}`);
            this.changeMove(null);
            if (this.movePlaced === 'attack') {
                Inventory.all['attack-left'].increaseCounter();
            } else if (this.movePlaced === 'block') {
                Inventory.all['block-left'].increaseCounter();
            }

            this.movePlaced = null;
        }
    }



    static all = {
        'head': new MovePlaceholder('head', null, null),
        'body': new MovePlaceholder('body', null, null),
        'legs': new MovePlaceholder('legs', null, null)
    };
}

export default MovePlaceholder;