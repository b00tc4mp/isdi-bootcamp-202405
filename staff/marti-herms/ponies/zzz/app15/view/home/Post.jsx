import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import LikeButton from './LikeButton'
import SaveButton from './SaveButton'
import Avatar from './Avatar'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Container from '../components/Container'
import Image from '../components/Image'
import Paragraph from '../components/Paragraph'
import Time from '../components/Time'

import { Component } from 'react'

import './Post.css'

class Post extends Component {
    constructor() {
        super()

        this.state = { editMode: false }
    }

    handleUserProfile() {
        const { post } = this.props

        this.props.onUserClick(post.author.username)
    }

    handleFollowButton() {
        try {
            const { post } = this.props

            logic.toggleUserFollow(post.author.username, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.props.onFollow()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleDeleteButton() {
        if (confirm('Delete Post?')) {
            try {
                const { post } = this.props

                logic.deletePosts(post.id, (error) => {
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
    }


    handleLikeClick() {
        this.props.onPostLiked()
    }

    handleSaveClick() {
        this.props.onPostSaved()
    }

    handleEditButton() {
        this.setState({ editMode: true })
    }

    handleCaptionEdit(event) {
        event.preventDefault()

        const { post } = this.props

        const form = event.target

        const captionEditInput = form['caption-edit-input']

        try {
            logic.editPost(post.id, captionEditInput.value, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                this.setState({ editMode: false })

                this.props.onPostEdited()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleEditCancel() {
        this.setState({ editMode: false })
    }

    render() {
        const { post } = this.props

        const editCaptionForm = <Form className="Form--column" onSubmit={this.handleCaptionEdit.bind(this)}>
            <Container>
                <Label htmlFor="caption-edit-input">Caption:</Label>
                <Input id="caption-edit-input" name="edit" defaultValue={post.caption} />
            </Container>
            <Container className="Container--row">
                <Button type="submit">Edit</Button>
                <Button type="button" onClick={this.handleEditCancel.bind(this)}>Cancel</Button>
            </Container>
        </Form>

        return <article className="Post">
            <Container className="Container--top">
                <Button className="Button--author" onClick={this.handleUserProfile.bind(this)}>
                    <Avatar url={post.author.avatar} />
                    <Heading level="4">{post.author.username}</Heading>
                </Button>
                {post.author.username !== logic.getUserUsername() && <Button onClick={this.handleFollowButton.bind(this)}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>}
            </Container>
            <Image src={post.img} alt={post.caption} title={post.caption} />
            <Container className="Container--actions">
                <LikeButton post={post} onLikeClicked={this.handleLikeClick.bind(this)} />
                <SaveButton post={post} onSaveClicked={this.handleSaveClick.bind(this)} />
            </Container>
            <hr />
            <Paragraph className="Paragraph--likes">{post.likes.length + ' like' + (post.likes.length !== 1 ? 's' : '')}</Paragraph>
            <Paragraph>{post.caption}</Paragraph>
            {
                post.author.username === logic.getUserUsername() && <Container className='Container--options'>
                    <Container className='Container--row Container--start'>
                        <Button onClick={this.handleDeleteButton.bind(this)}>Delete</Button>
                        <Button onClick={this.handleEditButton.bind(this)}>Edit</Button>
                    </Container>
                    <Container className="Container--edit">
                        {this.state.editMode && editCaptionForm}
                    </Container>
                </Container>
            }
            <Time>{formatTime(new Date(post.date))}</Time>
        </article >
    }
}

export default Post