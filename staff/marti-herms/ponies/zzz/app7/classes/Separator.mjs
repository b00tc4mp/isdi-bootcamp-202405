import Component from './Component.mjs'

class Separator extends Component {
    constructor() {
        super(document.createElement('hr'));
    }

    setColor(color) {
        this.container.style.borderColor = color;
    }
}

export default Separator;