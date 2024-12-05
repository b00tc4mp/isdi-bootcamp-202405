import Component from './Component.mjs'

class Time extends Component {
    constructor(className) {
        super(document.createElement('time'));
        this.container.className = className;
    }
}

export default Time;