import logic from '../../logic';

import Container from '../components/Container';
import Heading from '../components/Heading';
import Form from '../components/Form';
import Button from '../components/Button';

import './AddPostSection.css';

function AddPostSection({ onPostCreated, onCancel }) {
    const handleAddPost = (event) => {
        event.preventDefault();

        const form = event.target

        const postImageInput = form['post-image-input'];
        const postCaptionInput = form['post-caption-input'];

        const postImage = postImageInput.value;
        const postCaption = postCaptionInput.value;

        try {
            logic.addPost(postImage, postCaption, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostCreated();
            });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleCancel = (event) => {
        event.stopPropagation();

        if (event.target.className === 'Container--fader')
            onCancel();
    }

    const handleCancelButton = () => {
        onCancel();
    }

    return <Container className="Container--fader" onClick={handleCancel}>
        <section className="newposts">
            <Heading level="2">Create Post</Heading>
            <Form onSubmit={handleAddPost}>
                <Container className="Container--field">
                    <input id="post-image-input" type="text" placeholder=" " required />
                    <label htmlFor="post-image-input">Image</label>
                </Container>
                <Container className="Container--field">
                    <input id="post-caption-input" type="text" placeholder=" " />
                    <label htmlFor="post-caption-input">Caption</label>
                </Container>
                <Container className="Container--actions">
                    <Button type="submit">Create</Button>
                    <Button type="button" onClick={handleCancelButton}>Cancel</Button>
                </Container>
            </Form>
        </section>
    </Container>
}

export default AddPostSection;