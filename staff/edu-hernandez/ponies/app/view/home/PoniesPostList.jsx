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
        console.debug('PoniesPostList -> componentDidMount')

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
                const posts = logic.getAllPoniesPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostDeleted() {
        console.debug('PostList ->  handlePostDeleted')
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        console.debug('PostList ->   handlePostEdited')
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        console.debug('PostList ->   handlePostLikeToggled')
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFavToggled() {
        console.debug('PostList -> handlePostFavToggled')
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() {
        console.debug('PostList -> handleUserFollowToggled')
        try {
            const posts = logic.getAllPoniesPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('PostList -> render')

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

export default PoniesPostList