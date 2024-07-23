import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import { Component } from 'react'

import Button from '../components/Button'
import Container from '../components/Container'
import Form from '../components/Form'
import Heading from '../components/Heading'
import Image from '../components/Image'
import Input from '../components/Input'
import Label from '../components/Label'
import Paragraph from '../components/Paragraph'
import Time from '../components/Time'

import Avatar from './Avatar'

class Post extends Component {
    constructor() {
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

    handleEditPostClick() {
        this.setState({ editPostVisible: true })
    }

    handleCancelEditPostClick() {
        this.setState({ editPostVisible: false })
    }

    handleEditPostSubmit(event) {
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

    handleSavePostClick() {
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
        try {
            logic.toggleFollowUser(this.props.post.author.username, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.props.onFollowUserToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        const { post } = this.props

        return <article className="post">

            <Container className={"post__top"}>
                <Container className={"post__top-author"}>
                    <Avatar url={post.author.avatar} className={"avatar"} />

                    <Heading level="4" className={"post__author"}>{post.author.username}</Heading>
                </Container>

                {post.author.username !== logic.getUserUsername() && <>
                    <Button className={"post__button"} onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
                </>}
            </Container>

            <Image className={"post__image"} src={post.image} alt={post.caption} title={post.caption} />

            <section className="like-save-field">

                <Container className={"like__actions"}>
                    <Button className={"heart-button"} onClick={this.handleLikePostClick.bind(this)}>
                        <Image className={"heart"} src={post.like ? 'https://svgsilh.com/svg/304420-e91e63.svg' : 'https://svgsilh.com/svg/1179072.svg'} />
                    </Button>
                    <Paragraph className={"hearts__likes"}>{post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Paragraph>
                </Container>

                <Button className={"save-post-button"} onClick={this.handleSavePostClick.bind(this)}>
                    <Image className={"save-icon"} src={post.fav ? 'https://svgsilh.com/svg/1202757-ff0088.svg' : 'https://svgsilh.com/svg/1202757-c7d5dc.svg'} />
                </Button>

            </section>

            <Paragraph className={"post__caption"}>{post.caption}</Paragraph>

            {post.author.username === logic.getUserUsername() && <>
                <Container className={"post__actions"}>
                    <Button onClick={this.handleDeletePostClick.bind(this)}>Delete</Button>
                    <Button onClick={this.handleEditPostClick.bind(this)}>Edit</Button>
                </Container>
            </>}

            <Time className={"post__time"}>{formatTime(new Date(post.date))}</Time>

            {this.state.editPostVisible && <Form className={"form-edit-caption"} onSubmit={this.handleEditPostSubmit.bind(this)}>
                <Label htmlFor={"edit-caption-input"}></Label>
                <Input id={"edit-caption-input"} defaultValue={post.caption} type={"text"} />

                <Button type={"submit"}>Save</Button>
                <Button type={"button"} onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</Button>
            </Form>}
        </article>
    }
}

export default Post