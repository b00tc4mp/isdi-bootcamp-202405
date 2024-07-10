import logic from '../../logic/index.mjs'

import { Component } from 'react'

import Post from './Post.jsx'

import './PostList.css'

class FavPostList extends Component {
    constructor() {
        console.debug('FavPostList -> constructor')

        super()

        try {
            const posts = logic.getAllFavPosts()

            this.state = { posts } //objeto que contiene datos que pueden cambiar en el tiempo 
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        console.debug('PostList -> componentWillReceiveProps', newProps, this.props)

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

            alert(error.message)
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
        console.debug('PostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)} onPostLikeToggled={this.handlePostLikeToggled.bind(this)}
                onPostFavToggled={this.handlePostFavToggled.bind(this)}
                onUserFollowToggled={this.handleUserFollowToggled.bind(this)} />)}
        </section>
    }
}

export default FavPostList