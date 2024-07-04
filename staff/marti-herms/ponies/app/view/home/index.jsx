import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';

const { Component } = React;

class Home extends Component {
    constructor() {
        super();

        this.state = { refreshStamp: null, feed: 'home' };
    }

    handleHomeFeed() {
        this.setState({ feed: 'home' });
    }

    handleSearchUser(username) {
        this.setState({ feed: username })
    }

    handlePostCreated() {
        this.setState({ refreshStamp: Date.now() });
    }

    handleFollowedFeed() {
        this.setState({ feed: 'followed' });
    }

    handleSavedPostsFeed() {
        this.setState({ feed: 'saved' });
    }

    render() {
        return <>
            <Header />
            <main className="view main">
                <PostList refreshStamp={this.state.refreshStamp} feed={this.state.feed} />
            </main>
            <Footer onHomeButtonClick={this.handleHomeFeed.bind(this)} onSearch={this.handleSearchUser.bind(this)} onPostCreated={this.handlePostCreated.bind(this)} onFollowedButtonClick={this.handleFollowedFeed.bind(this)} onSavedPostsButtonClick={this.handleSavedPostsFeed.bind(this)} />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);