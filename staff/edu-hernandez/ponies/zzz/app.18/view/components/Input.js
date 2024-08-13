class Input extends Component {
    constructor() {
        super(document.createElement('input'))
    }

    setId(id) {
        this.container.id = id
    }

    setValue(value) {
        this.container.value = value
    }

    getValue() {
        return this.container.value
    }
}