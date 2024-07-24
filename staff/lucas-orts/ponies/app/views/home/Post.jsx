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
    const [editPostVisible, setEditPostVisible] = useState(false)

    const handleDeletePostClick = () => {
        if (confirm('delete post?'))
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    onPostDeleted()
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    const handleEditPostClick = () => {
        setEditPostVisible(true)
    }

    const handleCancelEditPostClick = () => {
        setEditPostVisible(false)
    }

    const handleEditPostSubmit = event => {
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
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostLikeToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFavPostClick = () => {
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
        try {
            logic.toggleFollowUser(post.author.username, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onUserFollowToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    return <article className="Post">

        <Container>
            <Avatar url={post.author.avatar} />

            <Heading level="4">{post.author.username}</Heading>

            <Button onClick={handleFollowUserClick}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} />

        <Paragraph>{post.caption}</Paragraph>

        <Container>
            <Button onClick={handleLikePostClick}>{(post.like ? '❤' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button onClick={handleFavPostClick}>{post.fav ? '🏴‍☠️' : '🏳️'}</Button>

            {post.author.username === logic.getUserUsername() && <>
                <Button onClick={handleDeletePostClick}>🗑</Button>
                <Button onClick={handleEditPostClick}>📝</Button>
            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit}>
            <Label htmlFor="edit-caption-input">Caption</Label>
            <Input id="edit-caption-input" defaultValue={post.caption} />

            <Button type="submit">Save</Button>
            <Button type="button" onClick={handleCancelEditPostClick}>Cancel</Button>
        </Form>}
    </article>
}

export default Post