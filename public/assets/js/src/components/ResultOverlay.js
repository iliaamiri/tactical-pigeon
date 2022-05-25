class ResultOverlay {
  static element = document.querySelector(".result-banner");

  static updateTitle(title) {
    this.element.classList.add(title);
  }
}

export default ResultOverlay;