class Button extends Component {
    constructor(className) {
        super(document.createElement('button'));
        this.container.className = className;
    }
}