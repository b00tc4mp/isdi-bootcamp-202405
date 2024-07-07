const { Component } = React

class Heading extends Component {
    constructor() {
        super()
    }
    render() {
        const Tag = `h${this.props.level}`

        return <Tag className={this.props.className}>{this.props.text}</Tag>

    }
}

export default Heading