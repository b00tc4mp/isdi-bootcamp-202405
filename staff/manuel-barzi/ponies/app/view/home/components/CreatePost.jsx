import logic from '../../../logic/index.mjs'

import Heading from '../../components/Heading'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Label from '../../components/Label'
import Button from '../../components/Button'
import Container from '../../components/Container'

function CreatePost({ onPostCreated, onCancelCreatePost }) {
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

            onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancelCreatePostClick = () => onCancelCreatePost()

    return <section className="CreatePost">
        <Heading level="2">Create Post</Heading>

        <Form className="Form--column" onSubmit={handleCreatePostSubmit}>
            <div className="form__field">
                <Label htmlFor="post-image-input">Image</Label>
                <Input id="post-image-input" />
            </div>

            <div className="form__field">
                <Label htmlFor="post-caption-input">Caption</Label>
                <Input id="post-caption-input" />
            </div>

            <div className="create-post-section__buttons">
                <Button type="submit">✅</Button>
                <Button type="reset" onClick={handleCancelCreatePostClick}>ｘ</Button>
            </div>
        </Form>
    </section>
}

export default CreatePost