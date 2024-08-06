import logic from '../../logic'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import Container from '../components/Container'


function CreatePost({ onPostCreated, onCancelCreatePost }) {
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

    return <section className="fixed bottom-0 start-0 w-full bg-[white] px-[.5rem] box-border">
        <Heading level="4">Create Post</Heading>

        <Form className={"Form"} onSubmit={handleCreatePostSubmit}>
            <Container className="flex flex-col gap-2">
                <Label htmlFor={"post-image-input"}>Image</Label>
                <Input id={"post-image-input"} />
            </Container>
            <Container className="flex flex-col gap-2">
                <Label htmlFor={"flex flex-col gap-2"} >Caption</Label>
                <Input className={"text-[inherit] rounded-[5px] border-[none] px-[.5rem] h-[50px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]"} id={"post-caption-input"} />
            </Container>

            <Container className="flex flex-col gap-2">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[10px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] px-[.2rem] mt-[1rem] " type={"submit"} >Create</Button>
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[10px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] px-[.2rem] mt-[1rem] " type={"reset"} onClick={handleCancelCreatePostClick}>Cancel</Button>
            </Container>
        </Form>
    </section>
}

export default CreatePost