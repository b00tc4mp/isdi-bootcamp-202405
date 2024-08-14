import { useState } from 'react'

import logic from '../../logic'
import formatTime from '../../util/formatTime.js'

import Button from '../library/Button'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import Confirm from '../common/Confirm'

export default function Post({ post, onPostDeleted, onUserFollowToggled }) {
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeletePostClick = () => setConfirmMessage('delete post?')

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

    const handleFollowUserClick = () => {
        try {
            logic.toggleFollowUser(post.author.id)
                .then(() => onUserFollowToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.confirmMessage)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article>
        <Container>
            <Avatar url={post.author.avatar}></Avatar>

            <Heading level='4'>{post.author.username}</Heading>

            <Button onClick={handleFollowUserClick}>{post.author.following ? 'unfollow' : 'follow'}</Button>

        </Container>

        {post.image && (
            <Image src={post.image} title={post.title} alt={post.alt} />
        )}

        {post.text && (
            <Paragraph >{post.text}</Paragraph>
        )}

        {/* TODO like and fav Container */}

        <Time>{formatTime(new Date(post.date))}</Time>

        {/* TODO editPostVisible */}
        <Container>
            {/* <Button onClick={handlLikePostClick}></Button> */}

            {post.author.id === logic.getUserId() && <>
                <Button onClick={handleDeletePostClick}>DELETE</Button>
            </>}
        </Container>

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel}></Confirm>}
    </article>
}