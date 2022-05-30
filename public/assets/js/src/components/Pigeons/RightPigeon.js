import Component from "../../core/component.js";

const RightPigeon = {
  ...Component,

  assetFolderPath: null,

  init() {
    this.DOMElement = document.querySelector('div.pigeons-container img.pigeon-right');
    if (!this.DOMElement) {
      console.error('RightPigeon.init: no DOMElement found. Please check the markup. (EJS) and make sure this page' +
        ' has a div with class pigeons-container and an img with class pigeon-right');
      return;
    }

    if (opponentSelectedPigeon && opponentSelectedPigeon.assetFolderPath) {
      this.assetFolderPath = opponentSelectedPigeon.assetFolderPath;
      this.applyHueAngle(opponentSelectedPigeon.hueAngle);
    } else {
      this.assetFolderPath = "/assets/img/pigeons/hoodie_pigeon";
    }

    this.renderNormalPhase();
  },

  renderNormalPhase() {
    this.DOMElement.src = `${this.assetFolderPath}/left_normal.svg`;
  },

  renderRoundWinning() {
    this.DOMElement.src = `${this.assetFolderPath}/left_hand_to_chest.svg`;
  },

  renderRoundLosing() {
    this.DOMElement.src = `${this.assetFolderPath}/left_rip.svg`;
  },

  renderRoundDraw() {
    this.DOMElement.src = `${this.assetFolderPath}/left_no_legs_normal_alternate.svg`;
  },

  applyHueAngle(hueAngle) {
    this.DOMElement.style.filter = `hue-rotate(${(hueAngle / 100).toFixed(2)}turn)`;
  },
};

// Initiating the component
RightPigeon.init();

export default RightPigeon;