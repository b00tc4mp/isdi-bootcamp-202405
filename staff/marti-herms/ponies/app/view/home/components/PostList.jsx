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

    updatePosts = () => {
        const posts = logic.getAllPosts();

        this.setState({ posts })
    }

    render() {
        return <section className="post-list" onClick={this.updatePosts}>
            {this.state.posts.map(post => <Post post={post} />)}
        </section>
    }
}

export default PostList