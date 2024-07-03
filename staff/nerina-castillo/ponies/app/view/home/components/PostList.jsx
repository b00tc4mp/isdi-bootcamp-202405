import logic from '../../../logic/index.mjs'

const { Component } = React

import Post from './Post.jsx'

class PostList extends Component {
    constructor() {
        super()

        try {
            const posts = logic.getAllPosts()

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <section className="post-list">
            {this.state.posts.map(post => <Post post={post} />)}
        </section>
    }
}

export default PostList