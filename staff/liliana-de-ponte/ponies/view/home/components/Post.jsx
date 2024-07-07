import logic from '../../../logic/index.mjs'
import Button from "../../components/Button"
import Label from '../../components/Label'
import Input from '../../components/Input'
import Form from '../../components/Form'
import Image from '../../components/Image'
import Paragraph from '../../components/Paragraph'
import Heading from '../../components/Heading'

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
                <Heading level={3} className={"post__author"} text={post.author.username} />

                <Button className={"Button"} onClick={this.handleFollowUserClick.bind(this)} text={post.author.following ? '🪅' : '🎠'} />
            </div>

            <Image className={"post__image"} src={post.image} />
            <Paragraph className={"post__caption"} text={post.caption} />

            <div className="post__actions">
                <Button className={"Button"} onClick={this.handleLikePostClick.bind(this)} text={(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')} />
                <Button className={"Button"} onClick={this.handleFavPostClick.bind(this)} text={post.fav ? '🏳️‍🌈' : '🏳️'} />

                {post.author.username === logic.getUserUsername() && <>
                    <Button className={"Button"} onClick={this.handleDeletePostClick.bind(this)} text={"🗑️"} />
                    <Button className={"Button"} onClick={this.handleEditPostClick.bind(this)} text={"📝"} />
                </>}
            </div>

            <time className="post__time">{formatTime(new Date(post.date))}</time>

            {this.state.editPostVisible && <Form onSubmit={this.handleEditPostSubmit.bind(this)}>
                <Label htmlFor={"edit-caption-input"} />
                <Input id={"edit-caption-input"} defaultValue={post.caption} />

                <Button className={"Button"} type={"submit"} text={"Save"} />
                <Button className={"Button"} type={"button"} onClick={this.handleCancelEditPostClick.bind(this)} text={"Cancel"} />
            </Form>}
        </article>
    }
}

export default Post