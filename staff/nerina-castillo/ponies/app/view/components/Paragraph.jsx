const { Component } = React

class Paragraph extends Component {
    constructor() {
        console.debug('Paragraph -> constructor')
        super()
    }

    render() {
        return <p className={this.props.className}>
            {this.props.text}
        </p>

    }
}

export default Paragraph