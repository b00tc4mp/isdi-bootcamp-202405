const { Component } = React

class Link extends Component {
    constructor() {
        super()
    }

    render() {
        return <a href={this.props.href} onClick={this.props.onClick}>{this.props.text}</a>
    }
}

export default Link