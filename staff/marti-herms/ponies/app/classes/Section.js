class Section extends Component {
    constructor(className) {
        super(document.createElement('section'));
        this.container.className = className;
    }
}