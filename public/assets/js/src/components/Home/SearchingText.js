import Component from "../../core/component.js";

const SearchingText = {
  ...Component,

  show() {
    this.DOMElement.style.display = "block";
  },

  hide() {

  },
};

SearchingText.DOMElement = document.querySelector('span.online-text-searching');

export default SearchingText;