import AddPostSection from './sections/AddPostSection';
import SearchSection from './sections/SearchSection';
import Button from '../components/Button'

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
        let homeClassName = this.state.homeButton ? 'Button--home active' : 'Button--home'
        let savedClassName = this.state.savedButton ? 'Button--saved active' : 'Button--saved'
        let searchClassName = this.state.searchButton ? 'Button--search--active' : 'Button--search'
        let followedClassName = this.state.followedButton ? 'Button--followed active' : 'Button--followed'

        return <footer className="Footer">
            {this.state.addPostVisibility === 'addPost' && <AddPostSection onPostCreated={this.handlePostCreated.bind(this)} onCancel={this.handleCancel.bind(this)} />}
            {this.state.addPostVisibility === 'searchUser' && <SearchSection onSearch={this.handleUserSearched.bind(this)} onCancel={this.handleCancel.bind(this)} />}
            <Button className={homeClassName} onClick={this.handleHomeButton.bind(this)}></Button>
            <Button className={searchClassName} onClick={this.handleSearchUserButton.bind(this)}></Button>
            <Button className="Button--add--post" onClick={this.handleAddPostButton.bind(this)}>+</Button>
            <Button className={followedClassName} onClick={this.handleFollowedPostsButton.bind(this)}></Button>
            <Button className={savedClassName} onClick={this.handleSavedPostsButton.bind(this)}></Button>
        </footer>
    }
}

export default Footer;