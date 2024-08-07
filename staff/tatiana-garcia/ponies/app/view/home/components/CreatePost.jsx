import logic from '../../../logic'

import Heading from '../../components/Heading'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Label from '../../components/Label'
import Button from '../../components/Button'
import Container from '../../components/Container'

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

    return <section className="fixed bottom-0 left-0 w-full bg-white p-2 box-border">
        <Heading level="2">{'Create Post'}</Heading>

        <Form className="flex-col" onSubmit={handleCreatePostSubmit}>
            <Container className="flex-col">
                <Container className="flex-col items-start">
                    <Label htmlFor="post-image-input">{'Image'}</Label>
                    <Input className="w-full" id="post-image-input" />
                </Container>

                <Container className="flex-col items-start">
                    <Label htmlFor="post-caption-input">{'Caption'}</Label>
                    <Input className="w-full" id="post-caption-input" />
                </Container>

                <Container className="justify-center">
                    <Button className="h-[30px] w-[70px] font-bold text-black border-[1px] border-black bg-gradient-to-r from-cyan-500 to-blue-500 m-1 " type="submit" >{"Create"}</Button>
                    <Button className="h-[30px] w-[70px] font-bold text-black border-[1px] border-black bg-gradient-to-r from-cyan-500 to-blue-500 m-1 " type="reset" onClick={handleCancelCreatePostClick}>{"Cancel"}</Button>
                </Container>
            </Container>
        </Form>
    </section>
}