import logic from '../../../logic/index.mjs'

import Post from './Post.jsx'

import { Component } from 'react'

class Body extends Component {
    constructor() {
        super()

        try {
            const posts = logic.getAllPosts()

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.refreshStamp !== this.props.refreshStamp || newProps.view === 'home') {
            try {
                const posts = logic.getAllPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }

        } else if (newProps.view === 'favorites') {
            try {
                const posts = logic.getAllFavPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }

        } else if (newProps.view === 'following') {
            try {
                const posts = logic.getAllFollowingUserPosts()

                this.setState({ posts })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    }

    handlePostDeleted() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLikedPost() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavPost() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowedUser() {
        try {
            const posts = logic.getAllPosts()

            this.setState({ posts })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className='view main'>

            <section className="post-list">

                {this.state.posts.map(post => <Post
                    post={post}
                    onPostDeleted={this.handlePostDeleted.bind(this)}
                    onPostEdited={this.handlePostEdited.bind(this)}
                    onPostLikeToggled={this.handleLikedPost.bind(this)}
                    onPostFavToggled={this.handleFavPost.bind(this)}
                    onFollowUserToggled={this.handleFollowedUser.bind(this)}
                />)}

            </section>

        </main>
    }
}


export default Body