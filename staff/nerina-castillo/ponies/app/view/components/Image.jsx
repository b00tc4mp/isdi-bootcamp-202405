const { Component } = React
class Image extends Component {
    constructor() {
        console.debug('Image -> constructor')
        super()
    }

    render() {
        return <img src={this.props.src}
            className={this.props.className} />
    }
}

export default Image