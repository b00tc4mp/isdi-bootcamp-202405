import { useState } from 'react'

import logic from '../../logic'
import formatTime from '../../util/formatTime.js'

import Button from '../library/Button'
import Input from '../library/Input'
import Label from '../library/Label'
import Form from '../library/Form'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import Confirm from '../common/Confirm'

export default function Post({ post, onPostDeleted, onPostEdited, onPostFavToggled, onUserFollowToggled }) {
    const [editPostVisible, setEditPostVisible] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(null)

    // const handleDeletePostClick = () => setConfirmMessage('delete post?')

    // const handleDeletePostAccept = () => {}

    return <article>
        <Container>
            <Avatar url={post.author.avatar}></Avatar>

            <Heading level='4'>{post.author.username}</Heading>

            {/* <Button onClick={handleFollowUserClick}></Button> */}
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

        {/* {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel}></Confirm>} */}
    </article>
}