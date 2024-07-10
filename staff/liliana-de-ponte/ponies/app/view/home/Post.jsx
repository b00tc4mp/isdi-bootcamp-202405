import logic from '../../logic/index.mjs'

import formatTime from '../../utils/formatTime.mjs'

import { Component } from 'react'

import Button from '../components/Button'
import Label from '../components/Label'
import Input from '../components/Input'
import Form from '../components/Form'
import Image from '../components/Image'
import Paragraph from '../components/Paragraph'
import Heading from '../components/Heading'
import Time from '../components/Time'
import Container from '../components/Container'

import Avatar from './Avatar.jsx'

import './Post.css'

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

            this.props.onPostFavToggled()
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

        return <article className="Post">
            <Container className="Container--column-center">
                <Avatar url={post.author.avatar} />

                <Heading level="3" className="Heading--post" >{post.author.username}</Heading>

                <Button className="Button--post" onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? '🪅' : '🎠'} </Button>
            </Container>

            <Image src={post.image} alt={post.caption} title={post.caption} />

            <Paragraph >{post.caption}</Paragraph>

            <Container>
                <Button className="Button--post" onClick={this.handleLikePostClick.bind(this)}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
                <Button className="Button--post" onClick={this.handleFavPostClick.bind(this)}>{post.fav ? '🏳️‍🌈' : '🏳️'} </ Button>

                {post.author.username === logic.getUserUsername() && <>
                    <Button className="Button--post" onClick={this.handleDeletePostClick.bind(this)}>🗑️</Button>
                    <Button className="Button--post" onClick={this.handleEditPostClick.bind(this)}> 📝</Button>
                </>}
            </Container>

            <Time>{formatTime(new Date(post.date))}</Time>

            {this.state.editPostVisible && <Form onSubmit={this.handleEditPostSubmit.bind(this)} className="Form--column">
                <Container className="Container--column">
                    <Label htmlFor={"edit-caption-input"} />
                    <Input id={"edit-caption-input"} defaultValue={post.caption} />
                </Container>

                <Container className="Container--center">
                    <Button type={"submit"}>Save</Button>
                    <Button type={"button"} onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</Button>
                </Container >
            </Form>}
        </article>
    }
}

export default Post