import logic from '../../logic'

import useContext from '../context.js'

import Container from '../library/Container'
import Button from '../library/Button'
import Form from '../library/Form'
import Heading from '../library/Heading'

export default function CreatePost({ onCancelCreatePost, onPostCreated }) {
    const { alert } = useContext()

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const postCaptionInput = form['post-caption-input']

        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postCaption)
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
        onCancelCreatePost()
    }
    return <>
        <Container className="fixed w-screen top-0 h-screen bg-black opacity-50"></Container>
        <Container className="fixed w-screen top-0 h-screen flex items-center justify-center">
            <Container className="p-4 border bg-gradient-to-br from-green-400 to-fuchsia-500 opacity-30% flex-col w-[23rem] flex items-center justify-center gap-5 rounded-xl">
                <Heading level="2" className="text-[25px] mt-5 font-bold">Create Post</Heading>
                <Form className="flex-col" onSubmit={handleCreatePostSubmit}>
                    <Container className="flex-col">
                        <Container className="flex-col items-start">
                            <textarea id="post-caption-input" rows="4" className="block p-2.5 w-80 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write here..."></textarea>
                        </Container>
                        <Container className="flex justify-around mt-5 mb-5">
                            <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" type="submit">Submit</Button>
                            <Button className="border w-20 h-10 border-gray-300 bg-white rounded-lg" type="reset" onClick={handleCancelCreatePostClick}>Cancel</Button>
                        </Container>
                    </Container>
                </Form>
            </Container>
        </Container>
    </>
} 