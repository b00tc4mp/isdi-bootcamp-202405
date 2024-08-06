import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import LikeButton from './LikeButton'
import SaveButton from './SaveButton'
import Avatar from '../components/Avatar.jsx'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Container from '../components/Container'
import Image from '../components/Image'
import Paragraph from '../components/Paragraph'
import Time from '../components/Time'

import { useState } from 'react'

import './Post.css'

export default function Post({ post, onUserClick, onPostDeleted, onPostEdited, onPostLiked, onPostSaved, onFollow }) {
    const [editMode, setEditMode] = useState(false)

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

    const handleDeleteButton = () => {
        if (confirm('Delete Post?')) {
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
    }


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

    const editCaptionForm = <Form className="Form--column" onSubmit={handleCaptionEdit}>
        <Container>
            <Label htmlFor="caption-edit-input">Caption:</Label>
            <Input id="caption-edit-input" name="edit" defaultValue={post.caption} />
        </Container>
        <Container className="Container--row">
            <Button type="submit">Edit</Button>
            <Button type="button" onClick={handleEditCancel}>Cancel</Button>
        </Container>
    </Form>

    return <article className="Post">
        <Container className="Container--top">
            <Button className="Button--author" onClick={handleUserProfile}>
                <Avatar url={post.author.avatar} />
                <Heading level="4">{post.author.username}</Heading>
            </Button>
            {post.author.id !== logic.getUserId() && <Button onClick={handleFollowButton}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>}
        </Container>
        <Image src={post.img} alt={post.caption} title={post.caption} />
        <Container className="Container--actions">
            <LikeButton post={post} onLikeClicked={handleLikeClick} />
            <SaveButton post={post} onSaveClicked={handleSaveClick} />
        </Container>
        <hr />
        <Paragraph className="Paragraph--likes">{post.likes.length + ' like' + (post.likes.length !== 1 ? 's' : '')}</Paragraph>
        <Paragraph>{post.caption}</Paragraph>
        {
            post.author.id === logic.getUserId() && <Container className='Container--options'>
                <Container className='Container--row Container--start'>
                    <Button onClick={handleDeleteButton}>Delete</Button>
                    <Button onClick={handleEditButton}>Edit</Button>
                </Container>
                <Container className="Container--edit">
                    {editMode && editCaptionForm}
                </Container>
            </Container>
        }
        <Time>{formatTime(new Date(post.date))}</Time>
    </article >
}