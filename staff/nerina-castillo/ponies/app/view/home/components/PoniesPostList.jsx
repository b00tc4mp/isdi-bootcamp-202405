import logic from '../../../logic/index.mjs'

const { Component } = React

import Post from './Post.jsx'

class PoniesPostList extends Component {
    constructor() {
        console.debug('PoniesPostList -> constructor')

        super()

        try {
            const posts = logic.getAllFollowingUserPosts()  //se traen todos los posts

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {  //se activa cuando el componente recibe nuevas props
        console.debug('PoniesPostList -> componentWillReceiveProps', newProps, this.props)

        if (newProps.refreshStamp !== this.props.refreshStamp)  //verifica si el valor de refreshStamp en las nuevas props es diferente de las props actuales y si lo es, indica que hay que obtener los nuevos datos
            try {
                const posts = logic.getAllFollowingUserPosts()  //se obtienen las publicaciones

                this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostLiked() {
        try {
            const posts = logic.getAllFollowingUserPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFaved() {
        try {
            const posts = logic.getAllFollowingUserPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowed() {
        try {
            const posts = logic.getAllFollowingUserPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostDeleted() {
        try {
            const posts = logic.getAllFollowingUserPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    handlePostEdited() {
        try {
            const posts = logic.getAllFollowingUserPosts()  //trae todos los posts

            this.setState({ posts })  //actualiza el estado del componente con la nueva lista de posts
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {  //renderiza el contenido del componente PoniesPostList
        console.debug('PoniesPostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={this.handlePostDeleted.bind(this)}
                onPostEdited={this.handlePostEdited.bind(this)}
                onPostLiked={this.handlePostLiked.bind(this)}
                onPostFavToggled={this.handlePostFaved.bind(this)}
                onUserFollowed={this.handleUserFollowed.bind(this)} />)}
        </section>
    }
}

export default PoniesPostList