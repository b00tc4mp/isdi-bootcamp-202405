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

export default function Comment({ comment, onCommentDeleted }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const handleDeleteComment = () => setConfirmMessage('delete comment?')

    const handleDeleteCommentCancel = () => setConfirmMessage(null)

    const handleDeleteCommentAccept = () => {
        try {
            logic.deleteComment(comment.id)
                .then(() => onCommentDeleted(comment.id))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className='m-3 mt-1'>
        <Container>
            <Container className='flex items-center gap-1'>
                <Avatar url={comment.author.avatar} />
                <Heading className='text-sm font-semibold text-slate-400'>{comment.author.username}</Heading>
                <Time className='text-xs text-slate-500'>{formatTime(new Date(comment.date))}</Time>
            </Container>
            <Container className='flex items-center justify-between'>
                <Paragraph className='text-sm'>{comment.text}</Paragraph>

                {comment.author.id === logic.getUserId() && <>
                    <Button onClick={handleDeleteComment}>delete</Button>
                </>}
            </Container>
        </Container>

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteCommentAccept} onCancel={handleDeleteCommentCancel} />}
    </article>
}