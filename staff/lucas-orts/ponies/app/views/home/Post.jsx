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

import Avatar from './Avatar'

import useContext from '../context'

export default function Post({ post, onPostDeleted, onPostEdited, onPostFavToggled, onPostLikeToggled, onUserFollowToggled }) {
    const { alert } = useContext()

    const [editPostVisible, setEditPostVisible] = useState(false)

    const handleDeletePostClick = () => {
        if (confirm('delete post?'))
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

            <Button onClick={handleFollowUserClick}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} />

        <Paragraph className="dark:text-white">{post.caption}</Paragraph>

        <Container>
            <Button onClick={handleLikePostClick}>{(post.like ? '❤' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button onClick={handleFavPostClick}>{post.fav ? '🏴‍☠️' : '🏳️'}</Button>

            {post.author.id === logic.getUserId() && <>
                <Button onClick={handleDeletePostClick}>🗑</Button>
                <Button onClick={handleEditPostClick}>📝</Button>
            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit}>
            <Container className="flex-col">
                <Label htmlFor="edit-caption-input">Caption</Label>
                <Input id="edit-caption-input" defaultValue={post.caption} />
            </Container>

            <Container className="justify-center">
                <Button type="submit">Save</Button>
                <Button type="button" onClick={handleCancelEditPostClick}>Cancel</Button>
            </Container>
        </Form>}
    </article>
}