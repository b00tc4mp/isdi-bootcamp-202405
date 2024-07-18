import logic from '../../logic'

import { Component } from 'react'

import Post from './Post'

import './PostList.css'

class PostList extends Component {
    constructor() {
        console.debug('PostList -> constructor')

        super()

        // starts with a void array, in case there's isn't postsPosted
        this.state = { posts: [] }
    }

    // ComponenetDidMount => Component class (React)
    // After mount automatically calls it
    componentDidMount() {
        // Developer message sesg. to console printing from debug.messages
        console.debug('PostList -> componentDidMount') 

        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        console.debug('PostList -> componentWillReceiveProps', newProps, this.props)

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
        console.debug('PostList -> handlePostDeleted')

        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        console.debug('PostList -> handlePostEdited')

        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        console.debug('PostList -> handlePostLikeToggled')

        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFavToggled() {
        console.debug('PostList -> handlePostFavToggled')

        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() {
        console.debug('PostList -> handleUserFollowToggled')

        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('PostList -> render')

        return <section className="PostList">
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

export default PostList