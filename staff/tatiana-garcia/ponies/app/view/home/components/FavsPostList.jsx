import logic from '../../../logic/index.mjs'

const { Component } = React

import Post from './Post.jsx'

class FavsPostList extends Component {
    constructor() {
        console.debug('FavsPostList -> constructor')

        super()

        try {
            const posts = logic.getAllFavPosts()

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        console.debug('FavsPostList -> componentWillReceiveProps', newProps, this.props)

        if (newProps.refreshStamp !== this.props.refreshStamp)
            try {
                const posts = logic.getAllFavPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostDeleted() {
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(message.error)
        }
    }

    handlePostFavToggled() {
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() {
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('FavsPostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)}
                onPostLikeToggled={this.handlePostLikeToggled.bind(this)}
                onPostFavToggled={this.handlePostFavToggled.bind(this)}
                onUserFollowToggled={this.handleUserFollowToggled.bind(this)}
            />)}
        </section>
    }
}

export default FavsPostList