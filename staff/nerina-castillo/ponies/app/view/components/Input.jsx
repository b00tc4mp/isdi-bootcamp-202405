const { Component } = React

class Input extends Component {
    constructor() {
        console.debug('Input -> constructor')
        super()
    }

    render() {
        return <input className={this.props.className}
            id={this.props.id}
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue} />

    }
}

export default Input