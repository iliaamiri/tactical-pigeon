import Component from "../core/component.js";

const DoneButton = {
  ...Component,

  click() {
    this.hide();
    // disabling buttons for a moment
    this.DOMElement.disableClick(); // disabling done button
  },

  hide() {
    // hide the done (fight!) button
    this.DOMElement.classList.add('d-none');
  },

  reset() {
    this.DOMElement.classList.remove('d-none'); // show
    this.DOMElement.enableClick(); // enabling done button
  },
};

DoneButton.DOMElement = document.querySelector('.done');

export default DoneButton;