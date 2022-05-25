import Component from "../../core/component.js";

const SearchingText = {
  ...Component,

  show() {
    this.DOMElement.style.display = "block";
  },

  hide() {
    this.DOMElement.style.display = "none";
  },
};

SearchingText.DOMElement = document.querySelector('span.online-text-searching');

export default SearchingText;