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
            this.target.classList.add(`filled-${this.moveType}`);
            this.movePlaced = this.moveType;
            this.changeMove(this.movePlaced);
            if (this.moveType === 'attack') {
                Inventory.all.myAttack.decreaseCounter();
            } else if (this.moveType === 'block') {
                Inventory.all.myBlock.decreaseCounter();
            }
            
        } else {
            /* do stuff as if it's OFF */
            console.log("ay?")
            this.target.classList.remove(`filled-${Move.moveTypeEnum[0]}`, `filled-${Move.moveTypeEnum[1]}`);
            this.changeMove(null);
            if (this.movePlaced === 'attack') {
                Inventory.all.myAttack.increaseCounter();
            } else if (this.movePlaced === 'block') {
                Inventory.all.myBlock.increaseCounter();
            }

            this.movePlaced = null;
        }
    }



    static all = {};
}

export default MovePlaceholder;