import LeftPigeon from "../components/Pigeons/LeftPigeon.js";

function restingMode() {
  document.querySelectorAll('.show-animation').forEach(element => {
    // console.log('element', element); // debug
    element.classList.add('hide-animation');
    element.classList.remove('show-animation');
  });

  document.querySelectorAll('.pop-in-animation').forEach(element => {
    // console.log('element', element); // debug
    element.classList.add('pop-out-animation');
    element.classList.remove('pop-in-animation');
  });

  LeftPigeon.exitMovePickingMode();

  document.getElementById("attack-image")
    .setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png");
  document.getElementById("shield-image")
    .setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");

}

export default restingMode;