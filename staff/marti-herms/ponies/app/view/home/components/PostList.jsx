import logic from '../../../logic/index.mjs';

import Post from './Post';

const { Component } = React;

class PostList extends Component {
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
        if (newProps.refreshStamp !== this.props.refreshStamp) {
            try {
                const posts = logic.getAllPosts();

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
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

    handlePostliked() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
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
        return <section className="post-list">
            {this.state.posts.map(post => <Post post={post} onPostDeleted={this.handleDeletedPost.bind(this)} onPostEdited={this.handlePostEdited.bind(this)} onPostLiked={this.handlePostliked.bind(this)} />)}
        </section>
    }
}

export default PostList