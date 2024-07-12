import logic from '../../logic'

import { Component } from 'react'
import Post from './Post.jsx'

import './PostList.css'

class FavsPostList extends Component {
    constructor() {
        super()

        try {
            const posts = logic.getAllFavPosts()

            this.state = { posts }
        }
        catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
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

    handlePostLiked() {
        try {
            const posts = logic.getAllFavPosts()
            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFav() {
        try {
            const posts = logic.getAllFavPosts()
            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowed() {
        try {
            const posts = logic.getAllFavPosts()
            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <section className="post-list">
            {this.state.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)}
                onPostLikeToggled={this.handlePostLiked.bind(this)}
                onPostFavToggled={this.handlePostFav.bind(this)}
                onUserFollowToggled={this.handleUserFollowed.bind(this)} />)}
        </section>
    }
}

export default FavsPostList