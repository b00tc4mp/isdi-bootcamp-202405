import Component from "../Component.js";

class Heading extends Component {
  constructor(level) {
    super(document.createElement(`h${level}`));
  }
}

export default Heading;
