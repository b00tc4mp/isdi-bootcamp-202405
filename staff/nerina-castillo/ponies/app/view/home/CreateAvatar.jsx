import logic from "../../logic/index";

import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Form from "../components/Form";

function CreateAvatar({ onAvatarCreated, onCancelCreateAvatar }) {
    const handleCreateAvatarSubmit = event => {
        console.debug('Header -> handleCreateAvatarSubmit')

        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']

        const postImage = postImageInput.value

        try {
            logic.createAvatar(postImage)

            onAvatarCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelCreateAvatarClick = () => onCancelCreateAvatar()

    return <section className="CreateAvatar">
        <Heading level={2}>Create Avatar</Heading>

        <Form className={"Form"} onSubmit={handleCreateAvatarSubmit}>
            <Container className="Container--field">
                <Label htmlFor={"post-image-input"}>Image</Label>
                <Input id={"post-image-input"} />
            </Container>

            <Container className="Container--field">
                <Button className="Button--section" type={"submit"}>Create</Button>
                <Button className="Button--section" type={"reset"} onClick={handleCancelCreateAvatarClick}>Cancel</Button>
            </Container>
        </Form>
    </section>
}

export default CreateAvatar