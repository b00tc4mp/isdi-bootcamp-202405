import logic from '../../logic'
import formatTime from '../../util/formatTime'
import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import Form from '../components/Form'
import Time from '../components/Time'
import Image from '../components/Image'
import Paragraph from '../components/Paragraph'
import Heading from '../components/Heading'
import Container from '../components/Container'
import './Post.css'
// import Avatar from './Avatar'

import { useState } from 'react'

const Post = ({ 
    post,
    onPostDeleted,
    onPostEdited,
    onPostFavToggled,
    onPostLikeToggled,
    onUserFollowToggled }) => {
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

    const handleLikeClick = () => {
        console.debug('Post -> handleLikeClick')

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

    const handleFavClick = () => {
        console.debug('Post -> handleFavClick')

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

    return <article className="Post">
        <Container className='Container--row--spacebetween'>
            <Heading level="3">{post.author.username}</Heading>
            {/* <Avatar url={post.author.avatar} /> */}

            <Button className="Button--follow" onClick={handleFollowUserClick}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
        </Container>

        <Image className='post--image' src={post.image} alt={post.caption} title={post.caption} />

        <Container className='Container--row--between'>
            <Button className="Button--like" onClick={handleLikeClick}>{(post.like ? '♥️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button className="Button--adfav" onClick={handleFavClick}>{post.fav ? 'Unfav' : 'Add fav'}</Button>
        </Container>

        <Paragraph className="Paragraph--post__caption">{post.caption}</Paragraph>

        <Container>
            <Time className='Time'>{formatTime(new Date(post.date))}</Time>
        </Container>

        <Container className='Container--row'>
            {post.author.username === logic.getUserId() && <>
                <Button className='Button--edit' onClick={handleEditPostClick}>Edit</Button>
                <Button className='Button--delete' onClick={handleDeletePostClick}>Delete</Button>
            </>}
        </Container>


        {editPostVisible && <Form onSubmit={handleEditPostSubmit}>
            <Label for="edit-caption-input"></Label>
            <Input id="edit-caption-input" defaultValue={post.caption} />

            <Button type="submit">Save</Button>
            <Button type="button" onClick={handleCancelEditPostClick}>Cancel</Button>
        </Form>}
    </article >
}

export default Post