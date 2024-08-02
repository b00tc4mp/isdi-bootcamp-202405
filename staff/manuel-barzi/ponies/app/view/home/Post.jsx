import logic from '../../logic'

import formatTime from '../../util/formatTime'

import { useState } from 'react'

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

const Post = ({ post, onPostDeleted, onPostEdited, onPostFavToggled, onPostLikeToggled, onUserFollowToggled }) => {
    console.debug('Post -> call')

    const [editPostVisible, setEditPostVisible] = useState(false)

    const handleDeletePostClick = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id)
                    .then(() => onPostDeleted())
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    const handleEditPostClick = () => {
        console.debug('Post -> handleEditPost')

        setEditPostVisible(true)
    }

    const handleCancelEditPostClick = () => {
        console.debug('Post -> handleCancelEditPostClick')

        setEditPostVisible(false)
    }

    const handleEditPostSubmit = event => {
        console.debug('Post -> handleEditPostSubmit')

        event.preventDefault()

        const form = event.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updatePostCaption(post.id, newCaption, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setEditPostVisible(false)

                onPostEdited()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLikePostClick = () => {
        console.debug('Post -> handleLikePostClick')

        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFavPostClick = () => {
        console.debug('Post -> handleFavPostClick')

        try {
            logic.toggleFavPost(post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostFavToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFollowUserClick = () => {
        console.debug('Post -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(post.author.username)
                .then(() => onUserFollowToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="Post">
        <Container className="Container--column-center">
            <Avatar url={post.author.avatar} />

            <Heading level="4">{post.author.username}</Heading>

            <Button onClick={handleFollowUserClick}>{post.author.following ? '🦄' : '🐴'}</Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} />

        <Paragraph>{post.caption}</Paragraph>

        <Container>
            <Button onClick={handleLikePostClick}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button onClick={handleFavPostClick}>{post.fav ? '🏳️‍🌈' : '🏳️'}</Button>

            {post.author.username === logic.getUserUsername() && <>
                <Button onClick={handleDeletePostClick}>🗑️</Button>
                <Button onClick={handleEditPostClick}>📝</Button>
            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit} className="Form--column">
            <Container className="Container--column">
                <Label htmlFor="edit-caption-input">Caption</Label>
                <Input id="edit-caption-input" defaultValue={post.caption} />
            </Container>

            <Container className="Container--center">
                <Button type="submit">Save</Button>
                <Button type="button" onClick={handleCancelEditPostClick}>Cancel</Button>
            </Container>
        </Form>}
    </article>
}

export default Post