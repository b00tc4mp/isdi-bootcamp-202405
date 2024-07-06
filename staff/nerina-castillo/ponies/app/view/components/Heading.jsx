const { Component } = React

class Heading extends Component {
    constructor() {
        console.debug('Heading -> constructor')
        super()
    }


    render() {
        const Tag = `h${this.props.level}` // 'h' + {this.props.level}

        return <Tag className={this.props.className}>
            {this.props.text}
        </Tag>
    }
}

export default Heading
