class List extends Component {
    constructor() {
        super(document.createElement('ul'))
    }

    setStyleType(style) {
        this.container.style.listStyleType = style
    }
}