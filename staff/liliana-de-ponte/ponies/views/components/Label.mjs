import Component from '../Component.mjs'

class Label extends Component {
    constructor() {
        super(document.createElement('label'))
    }
    setFor(id) {
        if (typeof id !== 'string')
            throw new TypeError('text is not a string')

        this.container.htmlFor = id
    }
    getFor() {
        return this.container.htmlFor
    }
}

export default Label