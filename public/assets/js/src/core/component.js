/**
 * NOT BEING USED YET. FOR LATER USAGE MAYBE
 * @type {{init(*): void, enableClick(): void, pushAnimationLibrary(...[*]): void, DOMElement: null, disableClick(): void}}
 */
const Component = {
  DOMElement: null,

  init(element) {
    this.DOMElement = element;
  },

  pushAnimationLibrary(...animations) {
    this.DOMElement.classList.add(...animations);
    this.addEventListener('animationend', () => {
      this.DOMElement.classList.remove(...animations);
    });
  },

  /**
   * Disables/Enabling clicking on an element.
   * Why did I made a new file and did this?
   *  Well, to answer the first questions: I don't wanna scroll in index.js until my finger dies.
   *  And for the second question: doesn't it look nice? -> element.disableClick() ! or element.enableClick() !
   */
  disableClick() {
    this.DOMElement.classList.add('currently-not-clickable');
  },
  enableClick() {
    this.DOMElement.classList.remove('currently-not-clickable');
  }
};

export default Component;