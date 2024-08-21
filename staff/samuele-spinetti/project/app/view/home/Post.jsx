import { useState } from 'react'
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
import Form from '../library/Form'
import Comment from './Comment'

export default function Post({ post, onPostDeleted, onPostLikeToggled }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [comments, setComments] = useState([])
    const { alert } = useContext()

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

    const handleCommentPost = () => {
        setCommentsVisible(true)
        loadComments()
    }

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

    const handleCreateCommentSubmit = event => {
        event.preventDefault()

        const form = event.target

        const commentTextInput = form['comment-text-input']

        const commentText = commentTextInput.value

        try {
            logic.createComment(post.id, commentText)
                .then(() => setCommentsVisible(false))
                .then(() => loadComments())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const loadComments = () => {
        try {
            logic.getAllComments(post.id)
                .then(comments => setComments(comments))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelCreateComment = () => setCommentsVisible(false)

    const handleDeletePostCancel = () => setConfirmMessage(null)

    const handleCommentDeleted = () => loadComments()

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#a3a3a3] bg-white p-[12px] rounded-xl mx-5">

        <Container className="flex justify-between">
            <Container className="flex items-center">
                <Image src="/profileIcon.svg" className="w-[30px] h-[30px] rounded-lg" />
                <Heading level="4" className="m-2 text-gray-600">Anonymous</Heading>
            </Container>
        </Container>

        <Paragraph className="m-2 ml-0">{post.caption}</Paragraph>
        <Time className={"block m-2 ml-0 text-[#c0c0c0] text-[0.9rem]"}>{formatTime(new Date(post.date))}</Time>

        <Container className="items-center">
            <Container className="flex flex-row items-center justify-between">
                <Container className="flex flex-row justify-between">
                    <Button className="bg-transparent border-none px-0" onClick={handleLikePostClick}>
                        <Image className="h-[30px] w-[30px]" src={post.like ? './heart-red.svg' : './heart-black.svg'} />
                    </Button>
                    <Paragraph className="flex items-center text-[#c0c0c0] ml-2 mr-4">{post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Paragraph>
                    <Button onClick={handleCommentPost} className={commentsVisible ? "border border-black bg-gradient-to-br from-green-300 to-fuchsia-300 w-10 h-10 flex justify-center items-center rounded-lg" : "bg-transparent"}>
                        <Image src="./commentIcon.svg" className="h-[26px] w-[26px]" />
                    </Button>
                </Container>
                {post.authorId === logic.getUserId() && <>
                    <Container className="m-2 ml-0gap-4">
                        <Button onClick={handleDeletePostClick}>
                            <Image className="h-[30px] w-[30px]" src="./deleteIcon2.svg" />
                        </Button>
                    </Container>
                </>}
            </Container>
        </Container>

        {commentsVisible && <Container>
            <Container className="flex-col items-center">
                <Form onSubmit={handleCreateCommentSubmit}>
                    <Container className="flex flex-col justify-center items-center">
                        <textarea id="comment-text-input" rows="2" className="block p-2.5 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write your thoughts here..."></textarea>
                    </Container>
                    <Container className="flex justify-around mt-3 mb-3">
                        <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" type="submit">Submit</Button>
                        <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" onClick={handleCancelCreateComment} type="submit">Cancel</Button>
                    </Container>
                </Form>
            </Container>
        </Container>}

        <section className="flex flex-col gap-3">
            {comments.map(comment => <Comment
                key={comment.id}
                comment={comment}
                onCommentDeleted={handleCommentDeleted}
            />)}
        </section>

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}

    </article >
}