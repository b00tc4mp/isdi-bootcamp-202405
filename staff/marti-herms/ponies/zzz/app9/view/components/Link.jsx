const { Component } = React;

class Link extends Component {
    constructor() {
        super();
    }

    handleClick(event) {
        event.preventDefault();

        try {
            location.href = '../' + this.props.href.toLowerCase();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }

    }

    render() {
        return <a href='' onClick={this.handleClick.bind(this)} >{this.props.href}</a>
    }
}

export default Link