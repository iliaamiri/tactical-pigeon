import RoundMove from "../../helpers/RoundMove.js";

const player1_shield = document.querySelector('img.my-shield');
const player1_attack = document.querySelector('img.my-attack');

class AmmoIcon {
  // Img tag element in DOM
  iconElement;

  // Ammo is either attack or block
  type;

  constructor(type, iconElement) {
    this.iconElement = iconElement;
    this.type = type;
  }

  /**
   * Do stuff and DOM manipulation after user clicked on this ammo icon
   */
  click() {
    RoundMove.selectedMoveType = this.type;
    // turn this button to clicked (activated)

    // this should be turned into a css class. because the src might differ everytime
    this.iconElement.setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedShield.png");
  }

  /**
   * Do DOM manipulation to make it un-pressed this.
   */
  unClick() {
    // turn this back to the static version

    // this should be turned into a css class. because the src might differ everytime
    this.iconElement.setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");
  }

  static all = {
    'player1_shield': new AmmoIcon("block", player1_shield),
    'player1_attack': new AmmoIcon("attack", player1_attack)
  };

  static {
    setInterval(() => {
      let myShield = this.all.player1_shield.iconElement;
      myShield.pushAnimationLibrary("animate__pulse", "animate__faster");

      setTimeout(() => {
        let myAttack = this.all.player1_attack.iconElement;
        myAttack.pushAnimationLibrary("animate__pulse", "animate__faster");
      }, 500);
    }, 2500);
  }
}

export default AmmoIcon;