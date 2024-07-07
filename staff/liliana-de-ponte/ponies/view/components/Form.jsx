const { Component } = React

class Form extends Component {
    constructor() {
        super()
    }
    render() {
        return <form className={this.props.className} onSubmit={this.props.onSubmit}>{this.props.children}</form>
    }
}

export default Form