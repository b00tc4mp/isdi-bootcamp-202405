class Link extends Component {
  constructor(selector) {
    super(document.querySelector(selector));
  }

  onClick(callback) {
    this.container.onclick = callback;
  }
}
