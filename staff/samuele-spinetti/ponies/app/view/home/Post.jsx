import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import { useState } from 'react'

import Button from '../components/Button'
import Container from '../components/Container'
import Form from '../components/Form'
import Heading from '../components/Heading'
import Image from '../components/Image'
import Input from '../components/Input'
import Label from '../components/Label'
import Paragraph from '../components/Paragraph'
import Time from '../components/Time'

import Avatar from './Avatar'

const Post = ({ post, onPostDeleted, onPostEdited, onPostLikeToggled, onPostFavToggled, onFollowUserToggled }) => {
    const [editPostVisible, setEditPostVisible] = useState(false)

    const handleDeletePostClick = () => {
        if (confirm('Delete post?'))
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

    const handleSavePostClick = () => {
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

                onFollowUserToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="post">

        <Container className={"post__top"}>
            <Container className={"post__top-author"}>
                <Avatar url={post.author.avatar} className={"avatar"} />

                <Heading level="4" className={"post__author"}>{post.author.username}</Heading>
            </Container>

            {post.author.username !== logic.getUserUsername() && <>
                <Button className={"post__button"} onClick={handleFollowUserClick}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
            </>}
        </Container>

        <Image className={"post__image"} src={post.image} alt={post.caption} title={post.caption} />

        <section className="like-save-field">

            <Container className={"like__actions"}>
                <Button className={"heart-button"} onClick={handleLikePostClick}>
                    <Image className={"heart"} src={post.like ? 'https://svgsilh.com/svg/304420-e91e63.svg' : 'https://svgsilh.com/svg/1179072.svg'} />
                </Button>
                <Paragraph className={"hearts__likes"}>{post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Paragraph>
            </Container>

            <Button className={"save-post-button"} onClick={handleSavePostClick}>
                <Image className={"save-icon"} src={post.fav ? 'https://svgsilh.com/svg/1202757-ff0088.svg' : 'https://svgsilh.com/svg/1202757-c7d5dc.svg'} />
            </Button>

        </section>

        <Paragraph className={"post__caption"}>{post.caption}</Paragraph>

        {post.author.username === logic.getUserUsername() && <>
            <Container className={"post__actions"}>
                <Button onClick={handleDeletePostClick}>Delete</Button>
                <Button onClick={handleEditPostClick}>Edit</Button>
            </Container>
        </>}

        <Time className={"post__time"}>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form className={"form-edit-caption"} onSubmit={handleEditPostSubmit}>
            <Label htmlFor={"edit-caption-input"}></Label>
            <Input id={"edit-caption-input"} defaultValue={post.caption} type={"text"} />

            <Button type={"submit"}>Save</Button>
            <Button type={"button"} onClick={handleCancelEditPostClick}>Cancel</Button>
        </Form>}
    </article>
}

export default Post