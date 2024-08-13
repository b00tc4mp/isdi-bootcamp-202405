import logic from "../../logic/index.mjs"

import { Component } from 'react'

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
        console.debug('FavsPostList ->  handlePostDeleted')
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        console.debug('FavsPostList ->   handlePostEdited')
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        console.debug('FavsPostList ->   handlePostLikeToggled')
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFavToggled() {
        console.debug('FavsPostList -> handlePostFavToggled')
        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() {
        console.debug('FavsPostList -> handleUserFollowToggled')
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
            {this.state.posts.map(post =>
                <Post post={post}
                key={post.id}
                    onPostDeleted={this.handlePostDeleted.bind(this)}
                    onPostEdited={this.handlePostEdited.bind(this)}
                    onPostLiked={this.handlePostLikeToggled.bind(this)}
                    onPostFavourited={this.handlePostFavToggled.bind(this)}
                    onUserFollowed={this.handleUserFollowToggled.bind(this)}
                />)}
        </section>
    }
}

export default FavsPostList