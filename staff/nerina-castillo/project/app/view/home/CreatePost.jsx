import logic from '../../logic/index.js'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'

export default function Createpost({ onPostCreated, onCancelCreatePost }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postTextInput = form['post-text-input']

        const postImage = postImageInput.value
        const postText = postTextInput.value

        try {
            logic.createPost(postImage, postText)
                .then(() => onPostCreated())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelCreatePostClick = () => onCancelCreatePost()

    return <section>
        <Heading level='4'>create post</Heading>

        <Form onSubmit={handleCreatePostSubmit}>
            <Container>
                <Label htmlFor='post-image-input'>image</Label>
                <Input id='post-image-input' />
            </Container>
            <Container>
                <Label htmlFor='post-text-input'>text</Label>
                <Input id='post-text-input' />
            </Container>
            <Container>
                <Button type='submit'>create</Button>
                <Button type='reset' onClick={handleCancelCreatePostClick}>cancel</Button>
            </Container>
        </Form>
    </section>
}