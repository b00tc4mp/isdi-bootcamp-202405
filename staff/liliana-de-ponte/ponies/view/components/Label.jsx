const { Component } = React

class Label extends Component {
    constructor() {
        super()
    }
    render() {
        return <label htmlFor={this.props.htmlFor}>{this.props.text}</label>
    }
}

export default Label

