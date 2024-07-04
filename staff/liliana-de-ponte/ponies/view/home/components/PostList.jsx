import logic from '../../../logic/index.mjs'

const { Component } = React

import Post from './Post.jsx'

class PostList extends Component {
    constructor() {
        console.debug('PostList -> constructor')

        super()

        try {
            const posts = logic.getAllPosts()

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
                const posts = logic.getAllPosts()

                this.setState({ posts }) //objeto que contiene datos que pueden cambiar en el tiempo 
            } catch (error) {
                console.error(error)

                alert(error.message)
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

    render() {
        console.debug('PostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post => <Post post={post} onPostDeleted={this.handlePostDeleted.bind(this)} onPostEdited={this.handlePostEdited.bind(this)} />)}
        </section>
    }
}

export default PostList