import logic from '../../logic/index'
import './PostList.css'

import { Component } from 'react'

import Post from './Post.jsx'

class PostList extends Component {
    constructor() {
        console.debug('PostList -> constructor')

        super()

        try {
            const posts = logic.getAllPosts()  //se traen todos los posts

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {  //se activa cuando el componente recibe nuevas props
        console.debug('PostList -> componentWillReceiveProps', newProps, this.props)

        if (newProps.refreshStamp !== this.props.refreshStamp)  //verifica si el valor de refreshStamp en las nuevas props es diferente de las props actuales y si lo es, indica que hay que obtener los nuevos datos
            try {
                const posts = logic.getAllPosts()  //se obtienen las publicaciones

                this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostLiked() {
        try {
            const posts = logic.getAllPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFaved() {
        try {
            const posts = logic.getAllPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowed() {
        try {
            const posts = logic.getAllPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostDeleted() {
        try {
            const posts = logic.getAllPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    handlePostEdited() {
        try {
            const posts = logic.getAllPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {  //renderiza el contenido del componente PostList
        console.debug('PostList -> render')

        return <section className="PostList">
            {this.state.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)}
                onPostLikeToggled={this.handlePostLiked.bind(this)}
                onPostFavToggled={this.handlePostFaved.bind(this)}
                onUserFollowToggled={this.handleUserFollowed.bind(this)} />)}
        </section>
    }
}

export default PostList