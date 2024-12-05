import Component from './Component.mjs'

class Author extends Component {
    constructor() {
        super(document.createElement('h3'));
        this.container.className = 'post__author';
    }
}

export default Author;