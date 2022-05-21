/*
* Move instances (objects) for every round -> RoundMove
* */
class RoundMove {
  // Enums of the move types. Will be used everywhere in the frontend application
  static moveTypeEnum = ['attack', 'block', 'none'];
  // Enums of the body parts. Will be used everywhere in the frontend application
  static bodyPartsEnum = ['head', 'body', 'legs'];

  // The head body-part property. Has a default of 'none'.
  #head = RoundMove.moveTypeEnum[2];

  // Will be gotten safely using the below getter
  get head() {
    return this.#head;
  }

  // Will be set safely using the below setter
  set head(moveType) {
    this.#head = RoundMove.getValidMoveType(moveType);
  }

  // The body body-part property. Has a default of 'none'.
  #body = RoundMove.moveTypeEnum[2];

  // Will be gotten safely using the below getter
  get body() {
    return this.#body;
  }

  // Will be set safely using the below setter
  set body(moveType) {
    this.#body = RoundMove.getValidMoveType(moveType);
  }

  // The legs body-part property. Has a default of 'none'.
  #legs = RoundMove.moveTypeEnum[2];

  // Will be gotten safely using the below getter
  get legs() {
    return this.#legs;
  }

  // Will be set safely using the below setter
  set legs(moveType) {
    this.#legs = RoundMove.getValidMoveType(moveType);
  }

  // The selected move type. Will be used in the whole application
  static #selectedMoveType = null;

  // Will be gotten safely using the below getter
  static get selectedMoveType() {
    return this.#selectedMoveType;
  }

  // Will be set safely using the below setter
  static set selectedMoveType(moveType) {
    this.#selectedMoveType = RoundMove.getValidMoveType(moveType);
  }

  // Gets the valid move type, safely.
  static getValidMoveType(moveType) {
    //console.log('movetype enum', RoundMove.moveTypeEnum);
    //console.log('index of movetype', RoundMove.moveTypeEnum.indexOf(moveType));
    return (RoundMove.moveTypeEnum.indexOf(moveType) > -1) ? moveType : 'none';
  }

  // Converts the properties to a JSON object to be used in other places of the application without errors.
  toJSON() {
    return {
      head: this.head,
      body: this.body,
      legs: this.legs,
    };
  }
};

export default RoundMove;