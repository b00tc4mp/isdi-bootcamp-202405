import logic from '../../logic'

import { Component } from 'react'

import Post from './Post'

import './PostList.css'

class PostList extends Component {
    constructor() {
        console.debug('PostList -> constructor')

        super()

        this.state = { posts: [] }

    }

    componentDidMount() {
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

    handlePostDeleted() {
        console.debug('PostList -> handlePostDeleted ')

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

    handlePostEdited() {
        console.debug('PostList -> handlePostEdited')

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

    handlePostLikeToggled() {
        console.debug('PostList -> handlePostLikeToggled')

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

    handlePostFavToggled() {
        console.debug('PostList -> handlePostFavToggled')

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

    handleUserFollowToggled() {
        console.debug('PostList -> handleUserFollowToggled')

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

    render() {
        console.debug('PostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post => <Post
                post={post}
                key={post.id}
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