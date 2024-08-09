import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import LikeButton from './LikeButton'
import SaveButton from './SaveButton'
import Avatar from './Avatar'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Container from '../library/Container'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Time from '../library/Time'
import Confirm from '../common/Confirm'

import { useState } from 'react'

export default function Post({ post, onUserClick, onPostDeleted, onPostEdited, onPostLiked, onPostSaved, onFollow }) {
    const [editMode, setEditMode] = useState(false)

    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleUserProfile = () => {
        onUserClick(post.author.id)
    }

    const handleFollowButton = () => {
        try {
            logic.toggleUserFollow(post.author.username)
                .then(() => onFollow())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteButton = () => setConfirmMessage('Delete Post?')

    const handleDeletePostAccept = () => {
        try {
            logic.deletePosts(post.id)
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

    const handleLikeClick = () => {
        onPostLiked()
    }

    const handleSaveClick = () => {
        onPostSaved()
    }

    const handleEditButton = () => {
        setEditMode(true)
    }

    const handleCaptionEdit = (event) => {
        event.preventDefault()

        const form = event.target

        const captionEditInput = form['caption-edit-input']

        try {
            logic.editPost(post.id, captionEditInput.value)
                .then(() => {
                    setEditMode(false)

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

    const handleEditCancel = () => {
        setEditMode(false)
    }

    const editCaptionForm = <Form className='flex-col' onSubmit={handleCaptionEdit}>
        <Container className='flex-row items-center' >
            <Label htmlFor='caption-edit-input'>Caption:</Label>
            <Input id='caption-edit-input' name='edit' defaultValue={post.caption} />
        </Container>
        <Container className='flex-row'>
            <Button type='submit'>Edit</Button>
            <Button type='button' onClick={handleEditCancel}>Cancel</Button>
        </Container>
    </Form >

    return <article className='shadow-lg shadow-slate-500 rounded bg-white box-content dark:bg-black'>
        <Container className='min-h-7 m-0 rounded-t-md flex-row justify-between bg-[#9E58F9]'>
            <Button className='flex flex-row items-center rounded-sm bg-transparent mt-1.5 mb-1.5 mr-4 ml-2 text-black gap-4' onClick={handleUserProfile}>
                <Avatar url={post.author.avatar} className='w-8 h-8' />
                <Heading level='4'>{post.author.username}</Heading>
            </Button>
            {post.author.id !== logic.getUserId() && <Button onClick={handleFollowButton}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>}
        </Container>
        <Image src={post.img} alt={post.caption} title={post.caption} className='block w-full max-h-fit m-0 box-border' />
        <Container className='flex-row justify-start m-3 gap-4'>
            <LikeButton post={post} onLikeClicked={handleLikeClick} />
            <SaveButton post={post} onSaveClicked={handleSaveClick} />
        </Container>
        <hr className='m-0' />
        <Paragraph className='text-slate-500 text-sm dark:text-white'>{post.likes.length + ' like' + (post.likes.length !== 1 ? 's' : '')}</Paragraph>
        <Paragraph>{post.caption}</Paragraph>
        {
            post.author.id === logic.getUserId() && <Container className='m-3 flex-col justify-start flex-wrap box-content'>
                <Container className='flex-row items-start'>
                    <Button className='rounded-sm bg-slate-300 min-w-20 h-6 text-black hover:bg-slate-500' onClick={handleDeleteButton}>Delete</Button>
                    <Button className='rounded-sm bg-slate-300 min-w-20 h-6 text-black hover:bg-slate-500' onClick={handleEditButton}>Edit</Button>
                </Container>
                <Container className='flex-row flex-wrap justify-start box-content'>
                    {editMode && editCaptionForm}
                </Container>
            </Container>
        }
        <Time>{formatTime(new Date(post.date))}</Time>

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}
    </article >
}