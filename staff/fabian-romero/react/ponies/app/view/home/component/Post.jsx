import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

const { Component } = React

class Post extends Component {
    constructor() {
        console.debug('Post -> constructor')

        super()

        this.state = { editPostVisible: false } // esto se hace para crear el estado de si se edita o no
    }

    handleDeletePostClick() { //aqui va el click porque es el "evento que hace este boton.. un click"
        if (confirm('Delete post?'))
            try {
                logic.deletePost(this.props.post.id)

                this.props.onPostDeleted()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }


    componentWillUnmount() {
        console.debug('post -> componentWillUnmount')
        //buscar para  ue se usa ciclo de vida del componente
    }

    handleEditPostClick() {
        console.debug('post -> handleEditPost')

        this.setState({ editPostVisible: true })

    }

    handleCancelEditPostClick() {
        console.debug('Post -> handleCancelEditPostClick')

        this.setState({ editPostVisible: false })
    }

    handleEditpostSubmit(event) {
        console.debug('Post -> handleCancelEditPostClick')

        event.preventDefault()

        const form = event.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updatePostCaption(this.props.post.id, newCaption)

            this.setState({ editPostVisible: false })

            this.props.onPostEdited()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLikePostClick() {
        console.debug('Post -> handleLikePostClick')

        try {
            logic.toggleLikePost(this.props.post.id) // aqui esto porque es propuedad de js 

            this.props.onPostLiked()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    handleFavPostClick() {
        console.debug('Post -> handleFavPostClick')

        try {
            logic.toggleFavPost(this.props.post.id) // esto viene de la logica de toggle

            this.props.onPostFavorited() // aqui se pone el nombre que le puse en postlistrender
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        console.debug('Post -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(this.props.post.author.username) // esta logica es la que adjuntamos del archivo anterior post.js

            this.props.onFollowedUser()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    render() {
        console.debug('Post -> render')

        const { post } = this.props // para poder acceder a los datos de otro archivo ( en este caso de post list)
        // falta me canizar los demas botones que se mecanizan en postlist, por eso uso props para traerlos aqui 

        return <article className="post">
            <div className="post__top">
                <h3 className="post__author">{post.author.username}</h3>

                <button className="Button" onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? '🦄' : '🐴'}</button>
            </div>



            <img className="post__image" src={post.image} />

            <p className="post__caption">{post.caption}</p>




            <div className="post__actions">
                <button className="Button" onClick={this.handleLikePostClick.bind(this)}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</button>


                <button className="Button" onClick={this.handleFavPostClick.bind(this)}>{post.fav ? '🏳️‍🌈' : '🏳️'}</button>

                {post.author.username === logic.getUserUsername() && <>
                    <button className="Button" onClick={this.handleDeletePostClick.bind(this)}>🗑️</button>

                    <button className="Button" onClick={this.handleEditPostClick.bind(this)}>📝</button>
                </>}
            </div>






            <time className="post__time">{formatTime(new Date(post.date))}</time>




            {this.state.editPostVisible && <form onSubmit={this.handleEditpostSubmit.bind(this)}>
                <label htmlFor="edit-caption-input"></label>
                <input id="edit-caption-input" defaultValue={post.caption} />

                <button className="Button" type="submit"> Save </button>

                <button className="Button" type="button" onClick={this.handleCancelEditPostClick.bind(this)}> Cancel </button>
            </form>}
        </article>
    }
}
export default Post