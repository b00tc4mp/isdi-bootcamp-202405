import Component from './Component.mjs'

class Paragraph extends Component {
    constructor(type) {
        super(document.createElement(type));
    }
}

export default Paragraph;