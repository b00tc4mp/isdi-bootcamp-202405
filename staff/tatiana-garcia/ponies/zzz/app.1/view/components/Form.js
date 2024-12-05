class Form extends Component {
    constructor() {
        super(document.createElement('form'))
    }

    onSubmit(callback) {
        this.container.onsubmit = callback
    }
}
