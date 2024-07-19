import logic from '../../logic'

import { Component } from 'react'

import Post from './Post'

import './PostList.css'

class FavsPostList extends Component {
    constructor() {
        console.debug('FavsPostList -> constructor')

        super()

        this.state = { posts: [] }
    }

    componentDidMount() {
        console.debug('FavsPostList -> componentDidMount')

        try {
            logic.getAllFavPosts((error, posts) => {
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
        console.debug('FavsPostList -> handlePostDeleted')

        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        console.debug('FavsPostList -> handlePostEdited')

        try {
            const posts = logic.getAllFavPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        console.debug('FavsPostList -> handlePostLikeToggled')

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

export default FavsPostList