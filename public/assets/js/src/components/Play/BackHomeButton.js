import Component from "../../core/component.js";

const BackHomeButton = {
  ...Component,

  show() {
    if (this.DOMElement) {
      this.DOMElement.classList.add('replay-in-animation');
      this.DOMElement.classList.remove('replay-out-animation');
      this.DOMElement.classList.remove('d-none');
    }
  },

  hide() {
    this.DOMElement.classList.add('d-none');
  }
};

BackHomeButton.DOMElement = document.querySelector('.back-home');

export default BackHomeButton;