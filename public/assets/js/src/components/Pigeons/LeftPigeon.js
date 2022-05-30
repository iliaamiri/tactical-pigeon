import Component from "../../core/component.js";

const LeftPigeon = {
  ...Component,

  assetFolderPath: null,

  init() {
    this.DOMElement = document.querySelector('div.pigeons-container img.pigeon-left');
    if (!this.DOMElement) {
      console.error('LeftPigeon.init: no DOMElement found. Makes sure to have a div.pigeons-container in the DOM. in' +
        ' play.ejs');
      return;
    }

    if (mySelectedPigeon && mySelectedPigeon.assetFolderPath) {
      this.assetFolderPath = mySelectedPigeon.assetFolderPath;
      this.applyHueAngle(mySelectedPigeon.hueAngle);
    } else {
      this.assetFolderPath = "/assets/img/pigeons/pusiness_pigeon";
    }

    this.renderNormalPhase();
  },

  renderNormalPhase() {
    this.DOMElement.src = `${this.assetFolderPath}/right_normal.svg`;
  },

  renderRoundWinning() {
    this.DOMElement.src = `${this.assetFolderPath}/right_hand_to_chest_alternate_1.svg`;
  },

  renderRoundLosing() {
    this.DOMElement.src = `${this.assetFolderPath}/right_rip.svg`;
  },

  renderRoundDraw() {
    this.DOMElement.src = `${this.assetFolderPath}/right_no_legs_normal_alternate_1.svg`;
  },

  enterMovePickingMode() {
    this.DOMElement.classList.add('picking-move-animation');
    this.DOMElement.classList.remove('revert-pigeon-pick-move');
  },

  exitMovePickingMode() {
    this.DOMElement.classList.add('revert-pigeon-pick-move');
    this.DOMElement.classList.remove('picking-move-animation');
  },

  applyHueAngle(hueAngle) {
    this.DOMElement.style.filter = `hue-rotate(${(hueAngle / 100).toFixed(2)}turn)`;
  },
};

// Initiating the component
LeftPigeon.init();

export default LeftPigeon;