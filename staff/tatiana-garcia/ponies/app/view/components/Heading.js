class Heading extends Component {

    constructor(level) {
        super(document.createElement(`h${level}`))
    }
}