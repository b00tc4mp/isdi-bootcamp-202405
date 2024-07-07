const { Component } = React

class Image extends Component {
    constructor() {
        super()
    }
    render() {
        return <img className={this.props.className} src={this.props.src}></img>
    }
}

export default Image