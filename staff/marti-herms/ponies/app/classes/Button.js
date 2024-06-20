class Button extends Component {
    constructor(className) {
        super(document.createElement('button'));
        this.container.className = className;
    }

    setType(type) {
        if (!(type.length > 0)) {
            throw new TypeError('type is not a String');
        }
        this.container.type = type;
    }
}