import logic from '../../logic'

import { Component } from 'react'

import Post from './Post'

import './PostList.css'

class PoniesPostList extends Component {
    constructor() {
        console.debug('PoniesPostList -> constructor')

        super()

        this.state = { posts: [] }

    }
    componentDidMount() {
        console.debug('PostList -> componentDidMount')

        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> componentWillReceiveProps', newProps, this.props)

        if (newProps.refreshStamp !== this.props.refreshStamp)
            try {
                logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handlePostDeleted')
        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handlePostDeleted')
        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handlePostLikeToggled')
        try {
            logic.getAllPoniesPosts((error, posts) => {

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
        console.debug('PoniesPostList -> handlePostFavToggled')
        try {
            logic.getAllPoniesPosts((error, posts) => {
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
        console.debug('PoniesPostList -> handleUserFollowToggled')
        try {
            logic.getAllPoniesPosts((error, posts) => {
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
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)} onPostLikeToggled={this.handlePostLikeToggled.bind(this)}
                onPostFavToggled={this.handlePostFavToggled.bind(this)}
                onUserFollowToggled={this.handleUserFollowToggled.bind(this)} />)}
        </section>
    }
}

export default PoniesPostList