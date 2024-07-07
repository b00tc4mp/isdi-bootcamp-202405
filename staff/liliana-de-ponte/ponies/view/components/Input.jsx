const { Component } = React

class Input extends Component {
    constructor() {
        super()
    }
    render() {
        return <input className={this.props.className} id={this.props.id} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} text={this.props.text} defaultValue={this.props.defaultValue} />
    }
}

export default Input

