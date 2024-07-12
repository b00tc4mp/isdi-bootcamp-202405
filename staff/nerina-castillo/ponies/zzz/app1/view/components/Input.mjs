import Component from "../Component.js";

class Input extends Component {
  constructor() {
    super(document.createElement("input"));

    this.container.name = "input";
  }
}

export default Input;
