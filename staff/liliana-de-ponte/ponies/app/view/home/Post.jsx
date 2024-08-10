import logic from '../../logic'

import formatTime from '../../utils/formatTime'

import { useState } from 'react'

import Button from '../library/Button.jsx'
import Label from '../library/Label.jsx'
import Input from '../library/Input.jsx'
import Form from '../library/Form.jsx'
import Image from '../library/Image.jsx'
import Paragraph from '../library/Paragraph.jsx'
import Heading from '../library/Heading.jsx'
import Time from '../library/Time.jsx'
import Container from '../library/Container.jsx'
import Confirm from '../common/Confirm.jsx'

import Avatar from './Avatar.jsx'

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
        console.debug('Post -> handleEditPostClick')

        setEditPostVisible(true)
    }


    const handleCancelEditPostClick = () => {
        console.debug('Post -> handleCancelPostClick')

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

    return <article className="shadow-[1px_1px_10px_1px_#F981FB] p-[12px] dark:bg-pink-900">

        <Container className="items-center justify-between">
            <Container>
                <Avatar url={post.author.avatar} />

                <Heading level="3" className="font-bold font-serif text-lg dark:text-white" >{post.author.username}</Heading>
            </Container>

            <Button className="bg-white  dark:bg-pink-900 rounded-[8px] h-[30px] border-[F981FB] font-bold font-serif" onClick={handleFollowUserClick}>{post.author.following ? '🪅' : '🎠'} </Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} className="w-full" />

        <Paragraph className="dark:text-white" >{post.caption}</Paragraph>

        <Container>
            <Button className="bg-white  dark:bg-pink-900 rounded-[8px] h-[30px] border-[F981FB] font-bold font-serif" onClick={handleLikePostClick}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button className="bg-white  dark:bg-pink-900 rounded-[8px] h-[30px] border-[F981FB] font-bold font-serif" onClick={handleFavPostClick}>{post.fav ? '🏳️‍🌈' : '🏳️'} </ Button>

            {post.author.id === logic.getUserId() && <>
                <Button className="bg-white  dark:bg-pink-900 rounded-[8px] h-[30px] border-[F981FB] font-bold font-serif" onClick={handleDeletePostClick}>🗑️</Button>
                <Button className="bg-white  dark:bg-pink-900 rounded-[8px] h-[30px] border-[F981FB] font-bold font-serif" onClick={handleEditPostClick}> 📝</Button>
            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit} className="flex-col gap-[0.9rem] min-w-[80%] mt-[40]">
            <Container className="flex-col">
                <Label htmlFor={"edit-caption-input"} />
                <Input id={"edit-caption-input"} defaultValue={post.caption} />
            </Container>

            <Container className="justify-center">
                <Button type={"submit"}>Save</Button>
                <Button type={"button"} onClick={handleCancelEditPostClick}>Cancel</Button>
            </Container >
        </Form>}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}

    </article>

}

