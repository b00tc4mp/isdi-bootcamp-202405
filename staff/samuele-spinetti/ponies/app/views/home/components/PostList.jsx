import logic from '../../../logic/index.mjs'

import Post from './Post.jsx'

const { Component } = React

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

    componentWillReceiveProps(newProps) {
        if (newProps.refreshStamp !== this.props.refreshStamp)
            try {
                const posts = logic.getAllPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostDeleted() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLikedPost() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavPost() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowedUser() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    render() {
        return <section className="post-list">
            {this.state.posts.map(post => <Post post={post} onPostDeleted={this.handlePostDeleted.bind(this)} onPostEdited={this.handlePostEdited.bind(this)} onPostLikeToggled={this.handleLikedPost.bind(this)} onPostFavToggled={this.handleFavPost.bind(this)} onFollowUserToggled={this.handleFollowedUser.bind(this)} />)}
        </section>
    }
}

export default PostList