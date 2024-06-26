class Separator extends Component {
    constructor() {
        super(document.createElement('hr'));
    }

    setColor(color) {
        this.container.style.borderColor = color;
    }
}