import AddPostSection from './sections/AddPostSection';
import SearchSection from './sections/SearchSection';

const { Component } = React;

class Footer extends Component {
    constructor() {
        super();

        this.state = { addPostVisibility: null, homeButton: true, savedButton: false, searchButton: false, followedButton: false };
    }

    handleHomeButton() {
        this.setState({ homeButton: true, savedButton: false, searchButton: false, followedButton: false });

        this.props.onHomeButtonClick();
    }

    handleFollowedPostsButton() {
        this.setState({ homeButton: false, savedButton: false, searchButton: false, followedButton: true });

        this.props.onFollowedButtonClick();
    }

    handleSavedPostsButton() {
        this.setState({ homeButton: false, savedButton: true, searchButton: false, followedButton: false })

        this.props.onSavedPostsButtonClick();
    }

    handleSearchUserButton() {
        this.setState({ addPostVisibility: 'searchUser', homeButton: false, savedButton: false, searchButton: true, followedButton: false });
    }

    handleUserSearched(username) {
        try {
            this.setState({ addPostVisibility: null, homeButton: false, savedButton: false, searchButton: true, followedButton: false });

            this.props.onSearch(username);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleAddPostButton() {
        this.setState({ addPostVisibility: 'addPost' })
    }

    handlePostCreated() {
        try {
            this.setState({ addPostVisibility: null, homeButton: true, savedButton: false, searchButton: false, followedButton: false })

            this.props.onPostCreated();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleCancel() {
        this.setState({ addPostVisibility: null, homeButton: true, savedButton: false, searchButton: false, followedButton: false });
    }

    render() {
        let homeClassName = this.state.homeButton ? 'home-button active' : 'home-button'
        let savedClassName = this.state.savedButton ? 'saved-list-button active' : 'saved-list-button'
        let searchClassName = this.state.searchButton ? 'search-button active' : 'search-button'
        let followedClassName = this.state.followedButton ? 'followed-button active' : 'followed-button'

        return <footer className="footer">
            {this.state.addPostVisibility === 'addPost' && <AddPostSection onPostCreated={this.handlePostCreated.bind(this)} onCancel={this.handleCancel.bind(this)} />}
            {this.state.addPostVisibility === 'searchUser' && <SearchSection onSearch={this.handleUserSearched.bind(this)} onCancel={this.handleCancel.bind(this)} />}
            <button className={homeClassName} onClick={this.handleHomeButton.bind(this)}></button>
            <button className={searchClassName} onClick={this.handleSearchUserButton.bind(this)}></button>
            <button className="add-post-button" onClick={this.handleAddPostButton.bind(this)}>+</button>
            <button className={followedClassName} onClick={this.handleFollowedPostsButton.bind(this)}></button>
            <button className={savedClassName} onClick={this.handleSavedPostsButton.bind(this)}></button>
        </footer>
    }
}

export default Footer;