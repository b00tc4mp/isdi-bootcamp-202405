import logic from '../../logic'

import formatTime from '../../util/formatTime'

import { useState } from 'react'

import Button from '../library/Button'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Confirm from '../common/Confirm'

import Avatar from './Avatar'

export default function Post({ post, onPostDeleted, onPostEdited, onPostFavToggled, onPostLikeToggled, onUserFollowToggled }) {
    console.debug('Post -> call')

    const [editPostVisible, setEditPostVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeletePostClick = () => setConfirmMessage('Delete Post?')

    const handleDeletePostAccept = () => {
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

    const handleDeletePostCancel = () => setConfirmMessage(null)


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
            logic.updatePostCaption(post.id, newCaption)
                .then(() => {
                    setEditPostVisible(false)

                    onPostEdited()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
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
            logic.toggleFavPost(post.id)
                .then(() => onPostFavToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleFollowUserClick = () => {
        console.debug('Post -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(post.author.id)
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

    return <article className="shadow-[1px_1px_10px_1px_lightgray] dark:bg-black">
        <Container className="items-center">
            <Avatar url={post.author.avatar} />

            <Heading level="4" className="dark:text-white">{post.author.username}</Heading>

            <Button onClick={handleFollowUserClick}>{post.author.following ? '🦄' : '🐴'}</Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} className="w-full" />

        <Paragraph className="dark:text-white">{post.caption}</Paragraph>

        <Container>
            <Button onClick={handleLikePostClick}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button onClick={handleFavPostClick}>{post.fav ? '🏳️‍🌈' : '🏳️'}</Button>

            {post.author.id === logic.getUserId() && <>
                <Button onClick={handleDeletePostClick}>🗑️</Button>
                <Button onClick={handleEditPostClick}>📝</Button>
            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit} className="flex-col">
            <Container className="flex-col">
                <Label htmlFor="edit-caption-input">Caption</Label>
                <Input id="edit-caption-input" defaultValue={post.caption} />
            </Container>

            <Container className="justify-center">
                <Button type="submit">Save</Button>
                <Button type="button" onClick={handleCancelEditPostClick}>Cancel</Button>
            </Container>
        </Form>}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}
    </article>
}