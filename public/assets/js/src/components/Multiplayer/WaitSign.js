import Component from "../../core/component.js";
import SearchingText from "../Home/SearchingText.js";
import SearchingForOpponent from "../Home/SearchingForOpponent.js";

const WaitSign = {
  ...Component,

  previousText: null,
  isShown: false,

  show(text, withDots = true) {
    this.isShown = true;
    this.DOMElement.classList.remove("d-none");
    this.DOMElement.classList.add("animate__slideInDown");
    SearchingText.DOMElement.innerHTML = text;
    SearchingText.show();
    if (withDots)
      SearchingForOpponent.animateWithDots();
  },

  hide() {
    this.DOMElement.classList.remove("animate__slideInDown");
    this.DOMElement.classList.add("d-none");
    this.isShown = false;
  },

  showTemporarily(text, withDots = true, timeout = 3000) {
    if (this.isShown) {
      this.hide();
    }
    let previousText = this.previousText;
    this.show(text, withDots);
    setTimeout(() => {
      this.hide();
      this.show(previousText);
    }, timeout);
  }
};

WaitSign.DOMElement = document.querySelector('.wait-sign');

export default WaitSign;