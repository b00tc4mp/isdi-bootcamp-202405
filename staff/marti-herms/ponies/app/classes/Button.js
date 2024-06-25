class Button extends Component {
    constructor(id) {
        super(document.createElement('button'));
        this.container.id = id;
    }

    onClick(callback) {
        this.container.onclick = callback;
    }
}