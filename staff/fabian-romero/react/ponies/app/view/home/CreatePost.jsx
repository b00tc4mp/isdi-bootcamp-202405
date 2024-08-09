import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'

export default function CreatePost({ onPostCreated, onCancelCreatePost }) {
    console.debug('CreatePost -> call')

    const handleCreatePostSubmit = event => {
        console.debug('CreatePost -> handleCreatePostSubmit')

        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postCaptionInput = form['post-caption-input']

        const postImage = postImageInput.value
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption)
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

    const handleCancelCreatePostClick = () => {
        console.debug('CreatePost -> handleCancelCreatePostClick')

        onCancelCreatePost()
    }

    return <section className="fixed bottom-0 left-0 w-full bg-white dark:bg-black dark:text-white p-2 box-border">
        <Heading level="2">Create Post</Heading>

        <Form className="flex-col" onSubmit={handleCreatePostSubmit}>
            <Container className="flex-col">
                <Container className="flex-col items-start">
                    <Label htmlFor="post-image-input">Image</Label>
                    <Input className="text-black" id="post-image-input" />
                </Container>

                <Container className="flex-col items-start">
                    <Label htmlFor="post-caption-input">Caption</Label>
                    <Input className="text-black" id="post-caption-input" />
                </Container>

                <Container className="justify-center">
                    <Button type="submit">✅</Button>
                    <Button type="reset" onClick={handleCancelCreatePostClick}>ｘ</Button>
                </Container>
            </Container>
        </Form>
    </section>
}