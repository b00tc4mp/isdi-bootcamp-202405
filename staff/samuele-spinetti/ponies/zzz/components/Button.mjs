import Component from '../Component.js'

class Button extends Component {
    constructor() {
        super(document.createElement('button'))
    }

    setType(type) {
        if (typeof type !== 'string')
            throw new TypeError('Type is not a string')

        this.container.type = type
    }

    onClick(callback) {
        this.container.onclick = callback
    }
}

export default Button