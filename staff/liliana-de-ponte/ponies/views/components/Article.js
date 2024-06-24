class Article extends Component {
    constructor() {
        super(document.createElement('article'))
    }
    onClick(callback) {
        this.container.onclick = callback
    }
    onSubmit(callback) {
        this.container.onsubmit = callback
    }
}