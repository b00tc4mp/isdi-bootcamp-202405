import Component from '../Component.js'

class Input extends Component {
    constructor() {
        super(document.createElement('input'))
    }

    setId(id) {
        if (typeof id !== 'string')
            throw new TypeError('Id is not a string')

        this.container.id = id
    }

    setValue(value) {
        if (typeof value !== 'string')
            throw new TypeError('Value is not a string')

        this.container.value = value
    }

    getValue() {
        return this.container.value
    }
}

export default Input