class Image extends Component {
    constructor() {
        super(document.createElement('img'));
        this.container.className = 'post__image';
    }

    setImage(imgString) {
        if (!(imgString.length > 0)) {
            throw new TypeError('imgString is not a String');
        }
        this.container.src = imgString;
    }
}