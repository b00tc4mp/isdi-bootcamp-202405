import Component from '../component.mjs'

class Paragraph extends Component {

    constructor() {
        super(document.createElement('p'))
    }
}

export default Paragraph