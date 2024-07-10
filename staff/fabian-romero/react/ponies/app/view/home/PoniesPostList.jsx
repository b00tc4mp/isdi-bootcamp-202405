import logic from '../../logic/index.mjs'

import { Component } from 'react'

import Post from './Post.jsx'
import './PostList.css'


class PoniesPostList extends Component {
    constructor() {
        console.debug('PoniesPostList -> constructor')

        super()

        try {
            const posts = logic.getAllPoniesPosts()

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        console.debug('PoniesPostList -> componentWillReceiveProps', newProps, this.props)

        if (newProps.refreshStamp !== this.props.refreshStamp)
            try {
                const posts = logic.getAllPoniesPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostDeleted() {
        console.debug('PoniesPostList -> handlePostDeleted')

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        console.debug('PoniesPostList -> handlePostEdited')

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        console.debug('PoniesPostList -> handlePostLikeToggled')

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFavToggled() {
        console.debug('PoniesPostList -> handlePostFavToggled')

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() {
        console.debug('PoniesPostList -> handleUserFollowToggled')

        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('PoniesPostList -> render')

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

export default PoniesPostList
