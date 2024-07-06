const { Component } = React


class Form extends Component {
    constructor() {
        console.debug('Form -> constructor')
        super()
    }

    render() {
        return <form className={this.props.className}
            onSubmit={this.props.onSubmit}>
            {this.props.children}

        </form>

    }
}

export default Form