class Component {
  constructor(container) {
    this.container = container;
  }

  add(child) {
    if (!(child instanceof Component))
      throw new TypeError("child is not a Component");

    this.container.appendChild(child.container);
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
}

class List extends Component {
  constructor() {
    super(document.createElement("ul"));
  }

  setStyleType(style) {
    this.container.style.listStyleType = style;
  }
}

class ListItem extends Component {
  constructor() {
    super(document.createElement("li"));
  }
}

class Square extends Component {
  constructor() {
    super(document.createElement("div"));
  }
  setSize(width, height) {
    this.container.style.width = width;
    this.container.style.height = height;
  }
}

class Circle extends Component {
  constructor() {
    super(document.createElement("div"));
  }
  setSize(width, heigth, borderRadius) {
    this.container.style.width = width;
    this.container.style.height = heigth;
    this.container.style.borderRadius = borderRadius;
  }
}

class Link extends Component {
  constructor() {
    super(document.createElement("a"));
  }

  setHref(href) {
    this.container.href = href;
  }

  setText(text) {
    this.container.text = text;
  }
}

const view = new Component(document.body);
view.setBackgroundColor("black");

const colorList = new List();
colorList.setStyleType("decimal");

const redColorItem = new ListItem();
redColorItem.setText("Red");
redColorItem.setColor("tomato");
colorList.add(redColorItem);

const blueColorItem = new ListItem();
blueColorItem.setText("Blue");
blueColorItem.setColor("dodgerblue");
colorList.add(blueColorItem);

const yellowColorItem = new ListItem();
yellowColorItem.setText("yellow");
yellowColorItem.setColor("gold");
colorList.add(yellowColorItem);

const greenSquare = new Square();
greenSquare.setSize("100px", "60px");
greenSquare.setBackgroundColor("green");
colorList.add(greenSquare);

const purpleCircle = new Circle();
purpleCircle.setSize("50px", "50px", "50%");
purpleCircle.setBackgroundColor("purple");
colorList.add(purpleCircle);

const newLink = new Link();
newLink.setHref("https://github.com/b00tc4mp/isdi-bootcamp-202405/issues/68");
newLink.setText("Git Hub issue #68");
newLink.setColor("white");
colorList.add(newLink);

view.add(colorList);
