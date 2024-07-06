import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import Image from '../../components/Image'
import Input from '../../components/Input'
import Label from '../../components/Label'
import Form from '../../components/Form'
import Heading from '../../components/Heading'

const { Component } = React

class Post extends Component {
    constructor() {
        console.debug('Post -> constructor')

        super()

        this.state = { editPostVisible: false }  //inicializa el estado de editPostVisible (propiedad de Post) en false (para que no se muestre el formulario)
    }

    handleDeletePostClick() {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(this.props.post.id) //accede a la id del post que va a eliminar

                this.props.onPostDeleted()  //notifica al padre que el post ha sido eliminado (podría suponer la actualización del PostList)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handleLikePostClick() {
        console.debug('Post -> handleLikePost')

        try {
            logic.toggleLikePost(this.props.post.id)  //accede a la id del post al que se va a dar like

            this.props.onPostLiked()  //notifica al padre del post que se le ha dado like
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavPostClick() {
        console.debug('Post -> handleFavPost')

        try {
            logic.toggleFavPost(this.props.post.id)  //accede a la id del post que se va a guardar en favoritos

            this.props.onPostFavToggled()  //notifica al padre del post que se ha guardado en favoritos
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        console.debug('Post -> handleFollowUser')

        try {
            logic.toggleFollowUser(this.props.post.author.username)  //acede al username del autor del post al que se va a seguir

            this.props.onUserFollowed()  //notifica al padre del usuario que se ha seguido
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillUnmount() {
        console.debug('Post -> componentWillUnmount')  //informa de que el componente está a punto de desmontarse
    }

    handleEditPostClick() {
        console.debug('Post -> handleEditPost')

        this.setState({ editPostVisible: true })  //cambia el estado de editPostVisible a true (para que se muestre el formulario)
    }

    handleCancelEditPostClick() {
        console.debug('Post -> handleCancelEditPostClick')

        this.setState({ editPostVisible: false }) //cambia el estado de editPostVisible a false (para que no se muestre el formulario)
    }

    handleEditpostSubmit(event) {
        console.debug('Post -> handleCancelEditPostClick')

        event.preventDefault()

        const form = event.target  //es el elemento al que va dirigida la acción

        const editCaptionInput = form['edit-caption-input']  //se recoge el elemento de HTML por su id

        const newCaption = editCaptionInput.value  //se recoge el valor del input

        try {
            logic.updatePostCaption(this.props.post.id, newCaption)  //actualiza el caption del post

            this.setState({ editPostVisible: false })  //cambia el estado de editPostVisible a false para que deje de mostrarse

            this.props.onPostEdited()  //le comunica al padre que un post ha sido editado
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Post -> render')

        const { post } = this.props

        return <article className="post">
            <div className="post__top">
                <Heading level={3} className={"post__author"} text={post.author.username} />

                <Button className={"Button"} onClick={this.handleFollowUserClick.bind(this)} text={post.author.following ? 'Unfollow' : 'Follow'} />
            </div>

            <Image className={"post__image"} src={post.image} />

            <Paragraph className="post__caption" text={post.caption} />

            <div className="post__actions">
                <Button className={"Button"} onClick={this.handleLikePostClick.bind(this)} text={(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')} />
                <Button className={"Button"} onClick={this.handleFavPostClick.bind(this)} text={post.fav ? '💫' : '⭐'} />

                {post.author.username === logic.getUserUsername() && <>
                    <Button className={"Button"} onClick={this.handleDeletePostClick.bind(this)} text={"Delete"} />
                    <Button className={"Button"} onClick={this.handleEditPostClick.bind(this)} text={"Edit"} />
                </>}
            </div>

            <time className={"post__time"}>{formatTime(new Date(post.date))}</time>

            {this.state.editPostVisible && <Form onSubmit={this.handleEditpostSubmit.bind(this)}>
                <Label htmlFor={"edit-caption-input"} />
                <Input className={"form__caption-input "} id={"edit-caption-input"} defaultValue={post.caption} />

                <Button className={" form__button-save"} type={"submit"} text={"Save"} />
                <Button className={" form__button-cancel"} type={"button"} onClick={this.handleCancelEditPostClick.bind(this)} text={"Cancel"} />
            </Form>}

        </article>

    }
}

export default Post