const { Component } = React

class Link extends Component {
    constructor(props) {
        console.debug('Link -> constructor')
        super(props)
    }

    render() {
        return <a href={this.props.href} onClick={this.props.onClick} > {this.props.text}</a>
    }
}

export default Link