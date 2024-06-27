import Component from './Component.mjs'

class Link extends Component {
    constructor(text) {
        super(document.createElement('a'));
        this.container.href = ''
        this.container.innerText = text;
    }

    onClick(callback) {
        this.container.onclick = callback;
    }
}

export default Link;