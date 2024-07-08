const { Component } = React;

class SearchSection extends Component {
    constructor() {
        super();
    }

    handleSearchUser(event) {
        event.preventDefault();

        const form = event.target

        const searchUserInput = form['post-caption-input']

        const username = searchUserInput.value;

        try {
            this.props.onSearch(username);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleCancel(event) {
        event.stopPropagation();

        if (event.target.className === 'fader')
            this.props.onCancel();
    }

    handleCancelButton() {
        this.props.onCancel();
    }

    render() {
        return <div className="fader" onClick={this.handleCancel.bind(this)}>
            <section className="usersearch">
                <h2>Search User</h2>
                <form className="form" onSubmit={this.handleSearchUser.bind(this)}>
                    <div className="form__field">
                        <input id="post-caption-input" className="form__input" type="text" required />
                        <label htmlFor="post-caption-input">Username</label>
                    </div>
                    <div className="form__actions">
                        <button className="form__button" type="submit">Search</button>
                        <button className="form__button" type="button" onClick={this.handleCancelButton.bind(this)}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    }
}

export default SearchSection;