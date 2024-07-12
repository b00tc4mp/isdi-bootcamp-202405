import Component from "../Component.js";

class Label extends Component {
  constructor() {
    super(document.createElement("label"));

    this.container.className = "label";
  }
}

export default Label;
