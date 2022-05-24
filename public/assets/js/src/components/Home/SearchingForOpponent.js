import Component from "../../core/component.js";

import SearchingText from "./SearchingText.js";

let searchingTextDots = 0;
let dots = "...";

const SearchingForOpponent = {
  ...Component,

  animateWithDots() {
    let text = SearchingText.DOMElement.innerHTML;
    this.interval = setInterval(() => {
      SearchingText.DOMElement.innerHTML = text + dots.substring(0, searchingTextDots % 4);
      searchingTextDots++;
    }, 700);
  },

  animate() {
    SearchingText.DOMElement.innerHTML = 'Finding an opponent';
    this.animateWithDots();
  },

  clearAnimation() {
    clearInterval(this.interval);
  },

  interval: null
};

export default SearchingForOpponent;