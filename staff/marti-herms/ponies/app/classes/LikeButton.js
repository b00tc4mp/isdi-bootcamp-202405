class LikeButton extends Component {
    constructor(id) {
        super(document.createElement('button'));
        this.setId(id);
    }

    onClick(callback) {
        this.container.onclick = callback;
    }

    setColorGray() {
        this.container.style.borderImage = 'radial-gradient(gray 69%, #0000 70%) 84.5%/50%';
    }

    setColorRed() {
        this.container.style.borderImage = 'radial-gradient(red 69%, #0000 70%) 84.5%/50%';
    }
}