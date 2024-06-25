class Input extends Component {
    constructor(id) {
        super(document.createElement('input'));
        this.container.id = id;
    }

    setPlaceholder(text) {
        this.container.placeholder = text;
    }

    setName(text) {
        this.container.name = text;
    }

    getValue() {
        return this.container.value;
    }

    setValue(value) {
        this.container.value = value;
    }
}