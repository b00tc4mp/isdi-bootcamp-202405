import logic from '../../logic/index.js'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Container from '../components/Container'

function CreatePost({ onPostCreated, onCancelCreatePost }) {
    console.debug('CreatePost -> call')

    const handleCreatePostSubmit = event => {
        console.debug('Footer -> handleCreatePostSubmit')

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

    return <section className="fixed botton-0 left-0 w-full bg-white p-2 box-border rounded-[15px]">
        <Heading className="Heading--create-post" level="2">Create Post</Heading>

        <Form className="flex-col gap-[0.9rem] min-w-[80%] mt-[40]" onSubmit={handleCreatePostSubmit}>
            <Container className="flex-col">
                <Container className="flex-col items-start">
                    <Label htmlFor="post-image-input">Image</Label>
                    <Input className="w-11/12" id="post-image-input" />
                </Container>

                <Container className="flex-col items-start">
                    <Label htmlFor="post-caption-input">Caption</Label>
                    <Input className="w-11/12" id="post-caption-input" />
                </Container>

                <Container className="justify-center gap-1rem">
                    <Button type="submit">Create</Button>
                    <Button type="reset" onClick={handleCancelCreatePostClick}>Cancel</Button>
                </Container>
            </Container>
        </Form>
    </section>
}

export default CreatePost