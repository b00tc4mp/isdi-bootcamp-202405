import logic from '../../../logic/index.mjs'

import formatTime from '../../../utils/formatTime.mjs'

const { Component } = React

class Post extends Component {
    constructor() {
        console.debug('Post -> constructor')

        super()

        this.state = { editPostVisible: false }
    }

    handleDeletePostClick() {
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
        console.debug('Post -> componentWillUnmount')

    }

    handleEditPostClick() {
        console.debug('Post -> handleEditPostClick')

        this.setState({ editPostVisible: true })
    }

    handleCancelEditPostClick() {
        console.debug('Post -> handleCancelPostClick')

        this.setState({ editPostVisible: false })
    }

    handleEditPostSubmit(event) {
        console.debug('Post -> handleEditPostSubmit')

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
            logic.toggleLikePost(this.props.post.id)

            this.props.onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavPostClick() {
        console.debug('Post -> handleFavPostClick')
        try {
            logic.toggleFavPost(this.props.post.id)

            this.props.onPostFavToggled() //props- datos que recibe del contenedor padre 
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        console.debug('Post -> handleFollowUserClick')
        try {
            logic.toggleFollowUser(this.props.post.author.username)

            this.props.onUserFollowToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Post -> render')

        const { post } = this.props //recogemos la propiedad del objeto -- en PostList //recogemos la propiedad del objeto -- en PostList //Las props son un objeto que se pasan como argumentos de un componente padre a un componente hijo. Son inmutables y no se pueden modificar desde el componente hijo. El state es un valor que se define dentro de un componente.

        return <article className="post">
            <div className="post__top">
                <h3 className="post__author">{post.author.username}</h3>

                <button className="Button" onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? '🪅' : '🎠'}</button>
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

            {this.state.editPostVisible && <form onSubmit={this.handleEditPostSubmit.bind(this)}>
                <label for="edit-caption-input"></label>
                <input id="edit-caption-input" defaultValue={post.caption} />

                <button class="Button" type="submit">Save</button>
                <button class="Button" type="button" onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</button>
            </form>}
        </article>
    }
}

export default Post