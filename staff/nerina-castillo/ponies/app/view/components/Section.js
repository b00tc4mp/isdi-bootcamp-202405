class Section extends Component {
  constructor() {
    super(document.createElement("section"));
  }
  remove() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
