import logic from '../../../logic/index.mjs';

import Post from './Post';

const { Component } = React;

class Body extends Component {
    constructor() {
        super();

        try {
            const posts = logic.getAllPosts();

            this.state = { posts };
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.refreshStamp !== this.props.refreshStamp || (newProps.feed !== this.props.feed && newProps.feed === 'home')) {
            try {
                const posts = logic.getAllPosts();

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        } else if (newProps.feed !== this.props.feed && newProps.feed === 'saved') {
            try {
                const posts = logic.getUserSavedPosts();

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        } else if (newProps.feed !== this.props.feed && newProps.feed === 'followed') {
            try {
                const posts = logic.getFollowedUserPosts();

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        } else if (newProps.feed !== this.props.feed && logic.getUserList().includes(newProps.feed)) {
            try {
                const posts = logic.getUserPosts(newProps.feed);

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        }
    }

    handleUserPosts(username) {
        try {
            const posts = logic.getUserPosts(username);

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handleDeletedPost() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handlePostLiked() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handlePostSaved() {
        if (this.props.feed === 'saved') {
            try {
                const posts = logic.getUserSavedPosts();

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        }
    }

    handlePostEdited() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    render() {
        return <main className="view main">
            <section className="post-list">
                {this.state.posts.map(post => <Post post={post}
                    onUsernameClick={this.handleUserPosts.bind(this)}
                    onPostDeleted={this.handleDeletedPost.bind(this)}
                    onPostEdited={this.handlePostEdited.bind(this)}
                    onPostLiked={this.handlePostLiked.bind(this)}
                    onPostSaved={this.handlePostSaved.bind(this)} />)}
            </section>
        </main>
    }
}

export default Body