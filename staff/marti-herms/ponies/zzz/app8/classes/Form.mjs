import Component from './Component.mjs'

class Form extends Component {
    constructor(className) {
        super(document.createElement('form'));
        this.container.className = className;
    }

    onSubmit(callback) {
        this.container.onsubmit = callback;
    }
}

export default Form;