class Image extends Component {
  constructor() {
    super(document.createElement("img"));
  }

  setSrc(src) {
    if (typeof src !== "string") throw new TypeError("src is not a string");

    this.container.src = src;
  }
}
