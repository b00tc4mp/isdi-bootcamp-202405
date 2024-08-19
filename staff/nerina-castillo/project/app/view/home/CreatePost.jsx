import logic from '../../logic/index.js'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Input from '../library/Input'
import Label from '../library/Label'
import Button from '../library/Button'
import Container from '../library/Container'

export default function Createpost({ onPostCreated, onCancelCreatePost }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postTextInput = form['post-text-input']

        const postImage = postImageInput.value
        const postText = postTextInput.value

        try {
            logic.createPost(postImage, postText)
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

    return <section className='fixed bottom-0 w-full bg-slate-300 text-slate-900 border rounded-xl'>
        <Heading className='mb-4 mt-3 ml-2 text-xl font-bold'>create post</Heading>

        <Form onSubmit={handleCreatePostSubmit}>
            <Container className='flex flex-col gap-2'>
                <Label htmlFor='post-image-input'>image</Label>
                <Input id='post-image-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col gap-2'>
                <Label htmlFor='post-text-input'>text</Label>
                <Input id='post-text-input' className='border-b border-gray-400 shadow-none focus:border-gray-600 focus:outline-none bg-transparent rounded-none' />
            </Container>
            <Container className='flex flex-col'>
                <Button type='submit' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold'>CREATE</Button>
                <Button type='reset' className='bg-gradient-to-r from-purple-950 to-purple-900 rounded-[5px] border-white border-[3px] mt-3 text-xl text-white font-bold mb-2' onClick={handleCancelCreatePostClick}>CANCEL</Button>
            </Container>
        </Form>
    </section>
}