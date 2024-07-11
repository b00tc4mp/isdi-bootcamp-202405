import Component from '../Component.js'

class Paragraph extends Component {
    constructor() {
        super(document.createElement('p'))
    }
}

export default Paragraph