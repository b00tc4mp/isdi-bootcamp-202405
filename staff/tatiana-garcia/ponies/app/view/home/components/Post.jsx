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

    return <article className="shadow-[1px_1px_10px_1px_lightgray]">
        <Container className="items-center">
            <Avatar url={post.author.avatar} />

            <Heading className="m-0 italic text-rgb(88, 5, 88)" level="4">{post.author.username}</Heading>

            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleFollowUserClick}>{post.author.following ? '🦄' : '🐴'}</Button>
        </Container>

        <Image src={post.image} alt={post.caption} title={post.caption} />

        <Paragraph>{post.caption}</Paragraph>

        <Container>
            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleLikePostClick}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
            <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleFavPostClick}>{post.fav ? '🤩' : '😔'}</Button>

            {post.author.id === logic.getUserId() && <>
                <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleDeletePostClick}>🗑️</Button>
                <Button className="bg-transparent border-transparent rounded-lg border border-solid text-dimgray p-1" onClick={handleEditPostClick}>📝</Button>

            </>}
        </Container>

        <Time>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form onSubmit={handleEditPostSubmit} className="flex-col">
            <Container className="flex-col items-start">
                <Label htmlFor="post-caption-input">{'Caption'}</Label>
                <Input className="w-full" id="post-caption-input" />
            </Container>

            <Container className="justify-center">
                <Button className="h-[30px] w-[70px] font-bold text-black border-[1px] border-black bg-gradient-to-r from-cyan-500 to-blue-500 m-1 " type="submit">{'Save'}</Button>
                <Button className="h-[30px] w-[70px] font-bold text-black border-[1px] border-black bg-gradient-to-r from-cyan-500 to-blue-500 m-1 " type="button" onClick={handleCancelEditPostClick}>{'Cancel'}</Button>
            </Container>
        </Form>}
    </article>

}
export default Post