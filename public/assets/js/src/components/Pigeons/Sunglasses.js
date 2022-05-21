class Sunglasses {
  element;

  static left;
  static right;

  constructor(element) {
    this.element = element;
  }

  activate() {
    this.element.classList.remove("d-none");
    this.element.classList.add("animate__backInDown", "animate__slow");
  }

  static {
    Sunglasses.left = new Sunglasses(document.querySelector(".sunglasses-left"));
    Sunglasses.right = new Sunglasses(document.querySelector(".sunglasses-right"));
  }
};

export default Sunglasses;