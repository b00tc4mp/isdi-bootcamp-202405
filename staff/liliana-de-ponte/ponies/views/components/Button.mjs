import Component from '../Component.mjs'

class Button extends Component {
    constructor() {
        super(document.createElement('button'))

        this.setClassName('Button')
    }

    onClick(callback) {
        this.container.onclick = callback
    }

    setType(type) {
        this.container.type = type
    }
}

export default Button