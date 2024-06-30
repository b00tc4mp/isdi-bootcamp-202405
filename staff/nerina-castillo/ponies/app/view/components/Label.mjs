import Component from "../Component.mjs";

class Label extends Component {
  constructor() {
    super(document.createElement("label"));

    this.container.className = "label";
  }
}

export default Label;
