import Component from '../Component.mjs'

class Paragraph extends Component {
    constructor() {
        super(document.createElement('p'))
    }
}

export default Paragraph