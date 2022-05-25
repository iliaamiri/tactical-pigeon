import Component from "../../core/component.js";

const LeftPigeon = {
  ...Component,

  enterMovePickingMode() {
    LeftPigeon.DOMElement.classList.add('picking-move-animation');
    LeftPigeon.DOMElement.classList.remove('revert-pigeon-pick-move');
  },

  exitMovePickingMode() {
    LeftPigeon.DOMElement.classList.add('revert-pigeon-pick-move');
    LeftPigeon.DOMElement.classList.remove('picking-move-animation');
  }
};

LeftPigeon.DOMElement = document.querySelector('div.pigeons-container img.pigeon-left');

export default LeftPigeon;