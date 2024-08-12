import Component from '../Component.js'

class Form extends Component {
    constructor(selector) {
        super(selector ? document.querySelector(selector) : document.createElement('form'))
    }

    onSubmit(callback) {
        this.container.onsubmit = callback
    }
}

export default Form