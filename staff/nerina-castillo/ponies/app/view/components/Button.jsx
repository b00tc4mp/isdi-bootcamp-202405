const { Component } = React

class Button extends Component {
    constructor() {
        console.debug('Button -> constructor')
        super()
    }



    render() {
        return <button onClick={this.props.onClick}
            type={this.props.type}
            className={this.props.className}
        >
            {this.props.text}
        </button>
    }
}

export default Button