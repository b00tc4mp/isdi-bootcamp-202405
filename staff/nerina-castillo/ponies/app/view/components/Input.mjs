import Component from "../Component.mjs";

class Input extends Component {
  constructor() {
    super(document.createElement("input"));

    this.container.name = "input";
  }
}

export default Input;
