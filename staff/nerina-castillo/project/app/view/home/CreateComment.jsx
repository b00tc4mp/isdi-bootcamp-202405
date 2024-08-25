import { useState } from 'react'
import logic from '../../logic'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'

export default function CreateComment({ onCommentCreated, postId }) {
    const [commentText, setCommentText] = useState('')

    const handleCreateCommentSubmit = event => {
        event.preventDefault()

        const form = event.target

        const commentTextInput = form['comment-text-input']
        const commentText = commentTextInput.value

        try {
            logic.createComment(postId, commentText)
                .then(() => {
                    onCommentCreated()
                    setCommentText('')
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

    return <section >
        <Container className='flex flex-row justify-between'>
            <Heading className='mb-4 mt-3 ml-2 text-xs text-slate-500 font-bold'>comments</Heading>
        </Container>
        <Form onSubmit={handleCreateCommentSubmit}>
            <Container className='flex flex-row gap-2 justify-between'>
                <Label htmlFor='comment-text-input'></Label>
                <Input id='comment-text-input'
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none text-slate-300 mb-2 w-full' />
                <Button type='submit' className=''>
                    <Image src='./send.png' className='w-[20px] h-[20px]' />
                </Button>
            </Container>
        </Form>
    </section>
}