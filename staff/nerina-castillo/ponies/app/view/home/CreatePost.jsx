import logic from '../../logic/index'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import Container from '../components/Container'

import './CreatePost.css'

function CreatePost({ onPostCreated, onCancelCreatePost }) {
    const handleCreatePostSubmit = event => {
        console.debug('Footer -> handleCreatePostSubmit')

        event.preventDefault()

        const form = event.target  //el elemento sobre el que se va a dirigir la acción

        const postImageInput = form['post-image-input']  //se recoge el elemento HTML del input de la imagen
        const postCaptionInput = form['post-caption-input']   //se recoge el elemento HTML del input del caption

        const postImage = postImageInput.value  //se recoge el valor del input de la imagen
        const postCaption = postCaptionInput.value   //se recoge el valor del input del caption

        try {
            logic.createPost(postImage, postCaption)  //actualiza el PostList

            onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelCreatePostClick = () => onCancelCreatePost()


    return <section className="CreatePost">
        <Heading level="2">Create Post</Heading>

        <Form className={"Form"} onSubmit={handleCreatePostSubmit}>
            <Container className="Container--field">
                <Label htmlFor={"post-image-input"}>Image</Label>
                <Input id={"post-image-input"} />
            </Container>
            <Container className="Container--field">
                <Label htmlFor={"post-caption-input"} >Caption</Label>
                <Input className={"Input--caption"} id={"post-caption-input"} />
            </Container>

            <Container className="Container--field">
                <Button className="Button--section" type={"submit"} >Create</Button>
                <Button className="Button--section" type={"reset"} onClick={handleCancelCreatePostClick}>Cancel</Button>
            </Container>
        </Form>
    </section>
}

export default CreatePost