import { useState, useEffect } from 'react'
import useContext from '../context.js'

import logic from '../../logic'

import formatTime from '../../util/formatTime.js'

import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Time from '../library/Time'

import Confirm from '../common/Confirm'

export default function Comment({ comment, onCommentDeleted }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [user, setUser] = useState(null)
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getUser(comment.author)
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error)
                })
        } catch (error) {
            console.error(error)

            alert(error)
        }
    }, [])

    const handleDeleteCommentClick = () => setConfirmMessage('Delete Comment?')

    const handleDeleteCommentCancel = () => setConfirmMessage(null)

    const handleDeleteCommentAccept = () => {
        try {
            logic.deleteComment(comment.id)
                .then(() => onCommentDeleted())
                .catch(error => {
                    console.error(error.message)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#a3a3a3] bg-white p-[14px] rounded-xl mx-3 my-3">

        <Container className="flex justify-between">
            <Container className="flex items-center">
                <Image src={!(user?.avatar) ? './profileIcon.svg' : user.avatar} className="w-[30px] h-[30px] rounded-lg" />
                <Heading level="4" className="m-2 text-gray-600">Anonymous</Heading>
            </Container>
        </Container>

        <Paragraph className="m-2 ml-0">{comment.text}</Paragraph>
        <Time className={"block m-2 ml-0 text-[#c0c0c0] text-[0.9rem]"}>{formatTime(new Date(comment.date))}</Time>
        {comment.author === logic.getUserId() && <>
            <Container className="flex justify-end">
                <Button onClick={handleDeleteCommentClick}>
                    <Image className="h-[30px] w-[30px]" src="./deleteIcon2.svg" />
                </Button>
            </Container>
        </>}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteCommentAccept} onCancel={handleDeleteCommentCancel} />}
    </article>
}
