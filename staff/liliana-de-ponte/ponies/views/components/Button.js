class Button extends Component {
    constructor() {
        super(document.createElement('button'))
    }
    onClick(callback) {
        this.container.onclick = callback
    }
    onSubmit(callback) {
        this.container.onsubmit = callback
    }
}