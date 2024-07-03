import Component from './Component.mjs'

class Field extends Component {
    constructor(className) {
        super(document.createElement('div'));
        this.container.className = className;
    }
}

export default Field;