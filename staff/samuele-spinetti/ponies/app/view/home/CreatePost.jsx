import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'

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

    return <section className="fixed bottom-0 left-0 w-full bg-[#ff4cad] p-2 box-border rounded-[25px_25px_0_0]">

        <Heading level="2" className={"m-[0.5rem_0] text-center"}>Create Post</Heading>

        <Form className={"flex flex-col gap-1 min-w-[80%]"} onSubmit={handleCreatePostSubmit}>
            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"post-image-input"}>Image</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} id={"post-image-input"} type={"text"} />
            </Container>

            <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                <Label htmlFor={"post-caption-input"}>Caption</Label>
                <Input className={"text-inherit rounded-[20px] border-white"} id={"post-caption-input"} type={"text"} />
            </Container>

            <Container className={"flex justify-center gap-4"}>
                <Button className={"text-inherit rounded-[20px] bg-[#ffd4ff] border-white"} type={"submit"}>Create</Button>
                <Button className={"text-inherit rounded-[20px] bg-[#ffd4ff] border-white"} type={"reset"} onClick={handleCancelCreatePostClick}>Cancel</Button>
            </Container>

        </Form>
    </section>
}

export default CreatePost