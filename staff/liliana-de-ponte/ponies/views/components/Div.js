class Div extends Component {
    constructor() {
        super(document.createElement('div'))

    }
    onClick(callback) {
        this.container.onclick = callback
    }
}