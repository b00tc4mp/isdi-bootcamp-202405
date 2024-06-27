class Label extends Component {
    constructor() {
        super(document.createElement('label'))
    }

    setFor(id) {
        this.container.htmlFor = id
    }

    getFor() {
        return this.container.htmlFor
    }
}