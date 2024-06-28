import Component from '../component.mjs'

class Heading extends Component {

    constructor(level) {
        super(document.createElement(`h${level}`))
    }
}

export default Heading