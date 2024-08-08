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

    return <article className="shadow-[1px_1px_10px_1px_rgba(0,0,0,0.2)] dark:bg-slate-800">
        <Container className='flex px-0 justify-between m-[.5rem] items-center '>
            <Avatar url={post.author.avatar} />

            <Heading level="4" >{post.author.username}</Heading>

            <Button onClick={handleFollowUserClick} >{post.author.following ? 'Unfollow' : 'Follow'}</Button>
        </Container>

        <Image src={post.image} title={post.title} alt={post.alt} />

        <Paragraph className="dark:text-white">{post.caption}</Paragraph>

        <Container>
            <Button onClick={handleLikePostClick}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button onClick={handleFavPostClick} >{post.fav ? '💫' : '⭐'}</Button>

            {post.author.id === logic.getUserId() && <>
                <Button onClick={handleDeletePostClick}  >Delete</Button>
                <Button onClick={handleEditPostClick}  >Edit</Button>
            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form className='flex flex-col min-widht-full px-0 m-[.5rem] text-[16px]' onSubmit={handleEditPostSubmit}>
            <Label htmlFor={"edit-caption-input"}>Caption</Label>
            <Input className={"text-[inherit] rounded-[5px] border-[none] px-[.5rem] h-[50px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]"} id={"edit-caption-input"} defaultValue={post.caption} />

            <Button className={"bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[10px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] px-[.2rem] mt-[1rem] "} type={"submit"}  >Save</Button>
            <Button className={"bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[10px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] px-[.2rem] mt-[1rem] "} type={"button"} onClick={handleCancelEditPostClick} >Cancel</Button>
        </Form>}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel}></Confirm>}
    </article>

}

