import logic from '../../logic'

import formatTime from '../../util/formatTime'

import { Component } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import Form from '../components/Form'
import Time from '../components/Time'
import Image from '../components/Image'
import Paragraph from '../components/Paragraph'
import Heading from '../components/Heading'
import Container from '../components/Container'

import Avatar from './Avatar'

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
                logic.deletePost(this.props.post.id, error => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.props.onPostDeleted()
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    componentWillUnmount() {
        console.debug('Post -> componentWillUnmount')
    }

    handleEditPostClick() {
        console.debug('Post -> handleEditPost')

        this.setState({ editPostVisible: true })
    }

    handleCancelEditPostClick() {
        console.debug('Post -> handleCancelEditPostClick')

        this.setState({ editPostVisible: false })
    }

    handleEditPostSubmit(event) {
        console.debug('Post -> handleEditPostSubmit')

        event.preventDefault()

        const form = event.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updatePostCaption(this.props.post.id, newCaption, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ editPostVisible: false })

                this.props.onPostEdited()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLikePostClick() {
        console.debug('Post -> handleLikePostClick')

        try {
            logic.toggleLikePost(this.props.post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.props.onPostLikeToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavPostClick() {
        console.debug('Post -> handleFavPostClick')

        try {
            logic.toggleFavPost(this.props.post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.props.onPostFavToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        console.debug('Post -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(this.props.post.author.username, error => {

                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.props.onUserFollowToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Post -> render')

        const { post } = this.props

        return <article className="Post">
            <Container className='Container--top'>
                <Avatar url={post.author.avatar} />

                <Heading level={3} >{post.author.username}</Heading>

                <Button onClick={this.handleFollowUserClick.bind(this)} >{post.author.following ? 'Unfollow' : 'Follow'}</Button>
            </Container>

            <Image src={post.image} title={post.title} alt={post.alt} />

            <Paragraph>{post.caption}</Paragraph>

            <Container>
                <Button onClick={this.handleLikePostClick.bind(this)}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
                <Button onClick={this.handleFavPostClick.bind(this)} >{post.fav ? '💫' : '⭐'}</Button>

                {post.author.username === logic.getUserUsername() && <>
                    <Button onClick={this.handleDeletePostClick.bind(this)}  >Delete</Button>
                    <Button onClick={this.handleEditPostClick.bind(this)}  >Edit</Button>
                </>}
            </Container>

            <Time>{formatTime(new Date(post.date))}</Time>

            {this.state.editPostVisible && <Form className='Form--edit' onSubmit={this.handleEditPostSubmit.bind(this)}>
                <Label htmlFor={"edit-caption-input"}>Caption</Label>
                <Input className={"Input--caption "} id={"edit-caption-input"} defaultValue={post.caption} />

                <Button className={"Button--section"} type={"submit"}  >Save</Button>
                <Button className={"Button--section"} type={"button"} onClick={this.handleCancelEditPostClick.bind(this)} >Cancel</Button>
            </Form>}

        </article>

    }
}

export default Post