import logic from '../../logic'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Form from '../library/Form'
import Button from '../library/Button'

export default function AddPostSection({ onPostCreated, onCancel }) {
    const handleAddPost = (event) => {
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

    const handleCancelButton = () => {
        onCancel()
    }

    return <>
        <Container className='fixed top-0 w-screen h-screen bg-black opacity-70 z-20 flex-col justify-center'></Container>
        <section className='newposts dark:bg-black dark:text-white'>
            <Heading level='2'>Create Post</Heading>
            <Form className='w-3/4' onSubmit={handleAddPost}>
                <Container className='mt-1 relative flex flex-col justify-between items-start gap-1 box-content'>
                    <input id='post-image-input' type='text' placeholder=' ' required />
                    <label htmlFor='post-image-input'>Image</label>
                </Container>
                <Container className='mt-1 relative flex flex-col justify-between items-start gap-1 box-content'>
                    <input id='post-caption-input' type='text' placeholder=' ' />
                    <label htmlFor='post-caption-input'>Caption</label>
                </Container>
                <Container className='mt-4 relative w-full h-8 flex-row justify-between items-start gap-1 box-content'>
                    <Button className='rounded bg-slate-300 min-w-20 h-6 text-black hover:bg-slate-500' type='submit'>Create</Button>
                    <Button className='rounded bg-slate-300 min-w-20 h-6 text-black hover:bg-slate-500' type='button' onClick={handleCancelButton}>Cancel</Button>
                </Container>
            </Form>
        </section>
    </>
}