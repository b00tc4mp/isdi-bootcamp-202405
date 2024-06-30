class Component {
  constructor(container) {
    this.container = container;
  }

  add(child) {
    if (!(child instanceof Component))
      throw new TypeError("child is not a Component");

    this.container.appendChild(child.container);
  }

  remove(child) {
    if (!(child instanceof Component))
      throw new TypeError("child is not a Component");

    this.container.removeChild(child.container);
  }

  has(child) {
    if (!(child instanceof Component))
      throw new TypeError("child is not a Component");

    const children = this.container.children;

    for (let i = 0; i < children.length; i++) {
      const childContainer = children[i];

      if (childContainer === child.container) return true;
    }

    return false;
  }

  setText(text) {
    if (typeof text !== "string") throw new TypeError("text is not a string");

    this.container.innerText = text;
  }

  setBackgroundColor(color) {
    if (typeof color !== "string") throw new TypeError("color is not a string");

    this.container.style.backgroundColor = color;
  }

  setColor(color) {
    if (typeof color !== "string") throw new TypeError("color is not a string");

    this.container.style.color = color;
  }

  setClassName(className) {
    if (typeof className !== "string")
      throw new TypeError("className is not a string");

    this.container.className = className;
  }

  setHtmlFor(htmlFor) {
    if (typeof htmlFor !== "string")
      throw new TypeError("htmlFor is not a string");

    this.container.htmlFor = htmlFor;
  }

  setType(type) {
    if (typeof type !== "string") throw new TypeError("type is not a function");

    this.container.type = type;
  }

  setId(id) {
    if (typeof id !== "string") throw new TypeError("id is not a string");

    this.container.id = id;
  }

  setValue(value) {
    if (typeof value !== "string") throw new TypeError("value is not a string");

    this.container.value = value;
  }

  getValue() {
    return this.container.value;
  }
}

export default Component;
