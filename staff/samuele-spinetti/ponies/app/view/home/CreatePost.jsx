import logic from '../../logic'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import Container from '../components/Container'

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

    return <section className="create-post-section">

        <Heading level="2" className={"create-post-section__title"}>Create Post</Heading>

        <Form className={"form"} onSubmit={handleCreatePostSubmit}>
            <Container className={"form__field"}>
                <Label htmlFor={"post-image-input"}>Image</Label>
                <Input className={"form__input"} id={"post-image-input"} type={"text"} />
            </Container>

            <Container className={"form__field"}>
                <Label htmlFor={"post-caption-input"}>Caption</Label>
                <Input className={"form__input"} id={"post-caption-input"} type={"text"} />
            </Container>

            <Container className={"create-post-section__buttons"}>
                <Button className={"form__button"} type={"submit"}>Create</Button>
                <Button className={"form__button"} type={"reset"} onClick={handleCancelCreatePostClick}>Cancel</Button>
            </Container>

        </Form>
    </section>
}

export default CreatePost