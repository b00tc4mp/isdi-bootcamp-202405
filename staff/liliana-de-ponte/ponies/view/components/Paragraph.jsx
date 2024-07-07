const { Component } = React

class Paragraph extends Component {
    constructor() {
        super()
    }
    render() {
        <p className={this.props.className}>{this.props.text}</p>

    }
}

export default Paragraph