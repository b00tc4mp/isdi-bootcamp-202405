import { useState, useEffect } from 'react'
import logic from '../../logic'
import formatTime from '../../util/formatTime.js'
import Button from '../library/Button'
import Time from '../library/Time'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import Confirm from '../common/Confirm'

export default function Comment({ comment }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    // const handleDeleteComment = () => setConfirmMessage('delete comment?')

    // const handleDeleteCommentCancel = () => setConfirmMessage(null)

    // const handleDeleteCommentAccept = () => {
    //     try {
    //         logic.deleteComment(comment.id)
    //             .then(() => onCommentDeleted())
    //             .catch(error => {
    //                 console.error(error)

    //                 alert(error.message)
    //             })
    //     } catch (error) {
    //         console.error(error)

    //         alert(error.message)
    //     }
    // }

    return <article>
        <Container>
            <Container>
                <Avatar url={comment.author.avatar} />
                <Heading>{comment.author.username}</Heading>
            </Container>

            <Paragraph>{comment.text}</Paragraph>
            <Time>{formatTime(new Date(comment.date))}</Time>

            {comment.author.id === logic.getUserId() && <>
                <Button onClick={handleDeleteComment}></Button>
            </>}
        </Container>

        {/* {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteCommentAccept} onCancel={handleDeleteCommentCancel = () => setConfirmMessage(null)} />} */}
    </article>
}