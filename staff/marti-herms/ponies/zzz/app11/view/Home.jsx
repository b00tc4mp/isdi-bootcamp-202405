import Header from './home/Header';
import Body from './home/Body';
import Footer from './home/Footer';

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
        const { onLogout } = this.props;
        return <>
            <Header onLogout={onLogout} />

            <Body refreshStamp={this.state.refreshStamp} feed={this.state.feed} />

            <Footer onHomeButtonClick={this.handleHomeFeed.bind(this)} onSearch={this.handleSearchUser.bind(this)} onPostCreated={this.handlePostCreated.bind(this)} onFollowedButtonClick={this.handleFollowedFeed.bind(this)} onSavedPostsButtonClick={this.handleSavedPostsFeed.bind(this)} />
        </>
    }
}

export default Home