import Component from '../Component.js'

class Image extends Component {
    constructor() {
        super(document.createElement('img'))
    }

    setUrl(url) {
        this.container.src = url
    }
}

export default Image