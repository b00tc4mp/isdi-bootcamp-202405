import Component from "../Component.mjs";

class Button extends Component {
  constructor() {
    super(document.createElement("button"));
  }

  onClick(callback) {
    this.container.onclick = callback;
  }
}

export default Button;
