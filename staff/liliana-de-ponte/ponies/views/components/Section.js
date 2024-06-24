class Section extends Component {
    constructor() {
        super(document.createElement('section'))

    }
    onClick(callback) {
        this.container.onclick = callback
    }

}


