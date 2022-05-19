import Component from "../../core/component.js";

import SearchingText from "./SearchingText.js";

let searchingTextDots = 0;
let dots = "...";

const SearchingForOpponent = {
  ...Component,

  animate() {
    this.interval = setInterval(() => {
      SearchingText.DOMElement.innerHTML = `Finding an opponent${dots.substring(0, searchingTextDots % 4)}`;
      searchingTextDots++;
    }, 700);
  },

  animateWait() {
    this.interval = setInterval(() => {
      SearchingText.DOMElement.innerHTML = `Waiting for opponent${dots.substring(0, searchingTextDots % 4)}`;
      searchingTextDots++;
    }, 700);
  },

  clearAnimation() {
    clearInterval(this.interval);
  },

  interval: null
};

export default SearchingForOpponent;