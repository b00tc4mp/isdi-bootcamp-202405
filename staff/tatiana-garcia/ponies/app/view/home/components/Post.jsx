import logic from '../../../logic'

import formatTime from '../../../util/formatTime'

import { useState } from 'react'

import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Label from '../../components/Label.jsx'
import Form from '../../components/Form.jsx'
import Time from '../../components/Time.jsx'
import Image from '../../components/Image.jsx'
import Paragraph from '../../components/Paragraph.jsx'
import Heading from '../../components/Heading.jsx'
import Container from '../../components/Container.jsx'

import Avatar from '../components/Avatar.jsx'

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

    return <article className="post">
        <Container className="Container--column-center">
            <Avatar url={post.author.avatar} />

            <Heading level="4">{post.author.username}</Heading>

            <Button onClick={handleFollowUserClick}>{post.author.following ? '🦄' : '🐴'}</Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} />

        <Paragraph>{post.caption}</Paragraph>

        <Container>
            <Button className='post-action-button' onClick={handleLikePostClick}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button className='post-action-button' onClick={handleFavPostClick}>{post.fav ? '🤩' : '😔'}</Button>

            {post.author.id === logic.getUserId() && <>
                <Button className='post-action-button' onClick={handleDeletePostClick}>🗑️</Button>
                <Button className='post-action-button' onClick={handleEditPostClick}>📝</Button>

            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit} className="Form--column">
            <Container className="Container--column">
                <Label htmlFor="edit-caption-input">{'Caption'}</Label>
                <Input id="edit-caption-input" defaultValue={post.caption} />
            </Container>

            <Container className="Container--center">
                <Button className='post-action-button' type="submit">{'Save'}</Button>
                <Button className='post-action-button' type="button" onClick={handleCancelEditPostClick}>{'Cancel'}</Button>
            </Container>
        </Form>}
    </article>

}
export default Post