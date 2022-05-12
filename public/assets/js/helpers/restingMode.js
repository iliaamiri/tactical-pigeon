
function restingMode() {
  document.querySelectorAll('.show-animation').forEach(element => {
    console.log('element', element);
    element.classList.add('hide-animation');
    element.classList.remove('show-animation');
  });

  document.querySelectorAll('.pop-in-animation').forEach(element => {
    console.log('element', element);
    element.classList.add('pop-out-animation');
    element.classList.remove('pop-in-animation');
  });

  let pigeon = document.querySelector('div.pigeons-container img.pigeon-left');
  pigeon.classList.add('revert-pigeon-pick-move');
  pigeon.classList.remove('picking-move-animation');

  document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png");
  document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");

}

export default restingMode;