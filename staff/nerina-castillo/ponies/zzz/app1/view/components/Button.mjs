import Component from "../Component.js";

class Button extends Component {
  constructor() {
    super(document.createElement("button"));
    this.setClassName("Button");
  }

  onClick(callback) {
    this.container.onclick = callback;
  }
}

export default Button;
