import logic from "../../logic"

import Heading from "../components/Heading"
import Form from "../components/Form"
import Input from "../components/Input"
import Label from "../components/Label"
import Button from "../components/Button"
import Container from "../components/Container"

import './CreatePost.css'

function CreatePost({ onPostCreated, onCancelCreatePost }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postCaptionInput = form['post-caption-input']

        const postImage = postImageInput.value
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption)

            onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelCreatePostClick = () => onCancelCreatePost()

    return <section className="CreatePost">
        <Heading level="2">Create Post</Heading>

        <Form className="form--column" onSubmit={handleCreatePostSubmit.bind(this)}>
            <Container className="form__field">
                <Label htmlFor="post-image-input">Image</Label>
                <Input id="post-image-input" />
            </Container>
            <Container className="form__field">
                <Label htmlFor="post-caption-input">Caption</Label>
                <Input id="post-caption-input" />
            </Container>

            <Container className="create-post-section__buttons">
                <Button type="submit">Create</Button>
                <Button type="reset" onClick={handleCancelCreatePostClick.bind(this)}>Cancel</Button>
            </Container>
        </Form>
    </section>
}
export default CreatePost