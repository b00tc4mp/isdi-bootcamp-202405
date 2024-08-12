import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import { useState } from 'react'

import Button from '../library/Button.jsx'
import Container from '../library/Container.jsx'
import Form from '../library/Form.jsx'
import Heading from '../library/Heading.jsx'
import Image from '../library/Image.jsx'
import Input from '../library/Input.jsx'
import Label from '../library/Label.jsx'
import Paragraph from '../library/Paragraph.jsx'
import Time from '../library/Time.jsx'
import Confirm from '../common/Confirm.jsx'

import Avatar from './Avatar'

const Post = ({ post, onPostDeleted, onPostEdited, onPostLikeToggled, onPostFavToggled, onFollowUserToggled }) => {
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

    const handleSavePostClick = () => {
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
                .then(() => onFollowUserToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#ff4cad] p-[12px] bg-white dark:bg-black">

        <Container className={"flex justify-between"}>
            <Container className={"flex items-center"}>
                <Avatar url={post.author.avatar} className={"w-8 h-8 rounded-[50%] [clip-path:circle(50%)] bg-[#bebebe]"} />

                <Heading level="4" className={"m-2"}>{post.author.username}</Heading>
            </Container>

            {post.author.id !== logic.getUserId() && <>
                <Button className={"bg-transparent border-none"} onClick={handleFollowUserClick}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
            </>}
        </Container>

        <Image className={"w-full"} src={post.image} alt={post.caption} title={post.caption} />

        <section className="flex justify-between items-center">

            <Container className={"flex items-center gap-1"}>
                <Button className={"bg-transparent border-none px-0"} onClick={handleLikePostClick}>
                    <Image className={"h-[20px] w-[20px]"} src={post.like ? 'https://svgsilh.com/svg/304420-e91e63.svg' : 'https://svgsilh.com/svg/1179072.svg'} />
                </Button>
                <Paragraph className={"text-[#c0c0c0] text-[0.9rem]"}>{post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Paragraph>
            </Container>

            <Button className={"bg-transparent border-none"} onClick={handleSavePostClick}>
                <Image className={"h-[30px] w-[30px]"} src={post.fav ? 'https://svgsilh.com/svg/1202757-ff0088.svg' : 'https://svgsilh.com/svg/1202757-c7d5dc.svg'} />
            </Button>

        </section>

        <Paragraph className={"m-2 ml-0"}>{post.caption}</Paragraph>

        {post.author.id === logic.getUserId() && <>
            <Container className={"m-2 ml-0 flex justify-end gap-4"}>
                <Button className={"rounded-[20px] bg-[#ffd4ff] border-white"} onClick={handleDeletePostClick}>Delete</Button>
                <Button className={"rounded-[20px] bg-[#ffd4ff] border-white"} onClick={handleEditPostClick}>Edit</Button>
            </Container>
        </>}

        <Time className={"block m-2 ml-0 text-[#c0c0c0] text-[0.9rem]"}>{formatTime(new Date(post.date))}</Time>

        {editPostVisible && <Form className={"flex justify-center gap-4"} onSubmit={handleEditPostSubmit}>
            <Label htmlFor={"edit-caption-input"}></Label>
            <Input className={"border-white rounded-[20px]"} id={"edit-caption-input"} defaultValue={post.caption} type={"text"} />

            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} type={"submit"}>Save</Button>
            <Button className={"bg-[#ffd4ff] border-white rounded-[10px]"} type={"button"} onClick={handleCancelEditPostClick}>Cancel</Button>
        </Form>}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}
    </article>
}

export default Post