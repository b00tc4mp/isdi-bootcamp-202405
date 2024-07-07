const { Component } = React

class Button extends Component {
    constructor() {
        super()
    }

    render() {
        return <button onClick={this.props.onClick} className={this.props.className} type={this.props.type}>{this.props.text}</button>
    }
}

export default Button