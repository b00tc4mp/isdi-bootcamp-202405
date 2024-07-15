class Form extends Component {
    constructor(selector) {
        super(document.querySelector(selector))
    }

    onSubmit(callback) {
        this.container.onsubmit = callback
    }
}