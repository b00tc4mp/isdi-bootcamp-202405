import Component from '../component.mjs'

class Button extends Component {

    constructor() {

        super(document.createElement('button'))
    }

    onClick(callback) {
        this.container.onclick = callback
    }

    setType(type) {
        this.container.type = type
    }
}
export default Button