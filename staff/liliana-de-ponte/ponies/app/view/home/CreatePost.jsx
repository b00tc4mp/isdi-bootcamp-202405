import logic from '../../logic/index.js'

import Heading from '../library/Heading.jsx'
import Form from '../library/Form.jsx'
import Label from '../library/Label.jsx'
import Input from '../library/Input.jsx'
import Button from '../library/Button.jsx'
import Container from '../library/Container.jsx'

export default function CreatePost({ onPostCreated, onCancelCreatePost }) {
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

    return <section className=" left-0 w-full bg-white dark:bg-pink-900 p-2 box-border rounded-[15px]">
        <Heading className="flex justify-center m-2 dark:text-white" level="2">Create Post</Heading>

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
                    <Button className="bg-[#F981FB]  dark:bg-pink-900 font-serif h-[30px] rounded-[8px] border-[f7bff8]" type="submit">Create</Button>
                    <Button className="bg-[#F981FB]  dark:bg-pink-900 font-serif h-[30px] rounded-[8px] border-[f7bff8]" type="reset" onClick={handleCancelCreatePostClick}>Cancel</Button>
                </Container>
            </Container>
        </Form>
    </section>
}

