import logic from '../../logic'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'

export default function CreateComment({ onCommentCreated, onCancelCreateComment, postId }) {

    const handleCreateCommentSubmit = event => {
        event.preventDefault()

        const form = event.target

        const commentTextInput = form['comment-text-input']
        const commentText = commentTextInput.value

        try {
            logic.createComment(postId, commentText)
                .then(() => onCommentCreated())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    const handleCancelCreateCommentClick = () => onCancelCreateComment()

    return <section>
        <Form onSubmit={handleCreateCommentSubmit}>
            <Container>
                <Label htmlFor='comment-text-input'>comment</Label>
                <Input id='comment-text-input' />
            </Container>
            <Container>
                <Button type='submit'>send</Button>
                <Button type='reset' onClick={handleCancelCreateCommentClick}>cancel</Button>
            </Container>
        </Form>
    </section>
}