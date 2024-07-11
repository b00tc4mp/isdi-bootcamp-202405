import logic from '../../logic/index.mjs'

import formatTime from '../../util/formatTime.mjs'

import { Component } from 'react'

import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Image from '../components/Image'
import Input from '../components/Input'
import Label from '../components/Label'
import Form from '../components/Form'
import Time from '../components/Time'
import Heading from '../components/Heading'
import Container from '../components/Container'

import Avatar from './Avatar'

import './Post.css'

class Post extends Component {
    constructor() {
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
        //esto hace cosas antes de que se desmonte un componente
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
            logic.updatePostCaption(this.props.post.id, newCaption)

            this.setState({ editPostVisible: false })

            this.props.onPostEdited()
        }
        catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    handleLikePostClick() {
        try {
            logic.toggleLikePost(this.props.post.id)

            this.props.onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    handleFavPostClick() {
        try {
            logic.toggleFavPost(this.props.post.id)

            this.props.onPostFavToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        try {
            logic.toggleFollowUser(this.props.post.author.username) // { username: ..., following: true | false }

            this.props.onUserFollowToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    render() {
        const post = this.props.post
        return <article className="Post">

            <Container>
                <Avatar url={post.author.avatar} />

                <Heading level="4">{post.author.username}</Heading>

                <Button onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
            </Container>

            <Image src={post.image} alt={post.caption} title={post.caption} />

            <Paragraph>{post.caption}</Paragraph>

            <Container>
                <Button onClick={this.handleLikePostClick.bind(this)}>{(post.like ? '❤' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
                <Button onClick={this.handleFavPostClick.bind(this)}>{post.fav ? '🏴‍☠️' : '🏳️'}</Button>

                {post.author.username === logic.getUserUsername() && <>
                    <Button onClick={this.handleDeletePostClick.bind(this)}>🗑</Button>
                    <Button onClick={this.handleEditPostClick.bind(this)}>📝</Button>
                </>}
            </Container>

            <Time>{formatTime(new Date(post.date))}</Time>

            {this.state.editPostVisible && <Form onSubmit={this.handleEditPostSubmit.bind(this)}>
                <Label htmlFor="edit-caption-input">Caption</Label>
                <Input id="edit-caption-input" defaultValue={post.caption} />

                <Button type="submit">Save</Button>
                <Button type="button" onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</Button>
            </Form>}
        </article>
    }
}

export default Post