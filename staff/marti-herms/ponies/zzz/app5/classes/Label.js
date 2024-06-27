class Label extends Component {
    constructor(htmlFor) {
        super(document.createElement('label'));
        this.container.htmlFor = htmlFor;
    }

    getFor() {
        return this.container.htmlFor;
    }
}