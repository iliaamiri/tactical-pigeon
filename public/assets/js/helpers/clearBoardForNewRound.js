// Component classes
import MovePlaceholder from '../components/MovePlaceholder.js';
import AmmoIcon from "../components/AmmoIcon.js";

// Helpers
import Players from "../helpers/Players.js";
import RoundMove from "../helpers/RoundMove.js";
import changeRoundTitle from "../helpers/changeRoundTitle.js";

// We need to have this DOM element for enabling/disabling it later on.
const doneButton = document.querySelector('div.done');

// simple timeout between rounds, no extra animations
function clearBoardForNewRound() {

  //MovePlaceholder.checked = false;

  // -- To avoid repeating ourselves a little bit here, we can put this logic inside of a static method in MovePlaceholder class
  // MovePlaceholder.all = {
  //     'head': new MovePlaceholder('head'),
  //     'body': new MovePlaceholder('body'),
  //     'legs': new MovePlaceholder('legs')
  // };

  // Resetting/Re-initializing the MovePlaceholders
  MovePlaceholder.resetAll();

  //Move.myMoves = {
  //head: null,
  //body: null,
  //legs: null
  //};
  //Move.selectedMoveType = null;
  Players.all.player1.resetMoves();
  RoundMove.selectedMoveType = 'none';

  //console.log('MovePlaceholder', MovePlaceholder.all);

  document.querySelector('div.done').classList.remove('d-none')
  document.querySelector('div.moves-placeholder').classList.remove('d-none')

  document.querySelectorAll('div.mv-placeholder').forEach((element) => {
      element.classList.remove('filled-block');
      element.classList.remove('filled-attack');
  });

  document.querySelectorAll('.pop-out-animation').forEach((element) => {
      element.classList.add('pop-in-animation');
      element.classList.remove('pop-out-animation');
  });

  const leftPigeon = document.querySelector('div.pigeons-container img.pigeon-left');
  //console.log('left pigeon', leftPigeon);
  leftPigeon.classList.add('picking-move-animation');
  leftPigeon.classList.remove('revert-pigeon-pick-move');

  changeRoundTitle();

  document.querySelectorAll('.hide-animation').forEach(element => {
      element.classList.add('show-animation');
      element.classList.remove('hide-animation');
  });

// Enabling everything back for the next new round
  doneButton.enableClick(); // enabling done button

  Object.values(AmmoIcon.all)
      .map(ammoIconComponent => ammoIconComponent.iconElement.enableClick()); // enabling inventory ammo images/buttons.

  Object.values(MovePlaceholder.all)
      .map(movePlaceholderComponent => movePlaceholderComponent.target.enableClick()); // enabling the move placeholders

};

export default clearBoardForNewRound;