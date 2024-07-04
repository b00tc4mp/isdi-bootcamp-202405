import logic from '../../../logic/index.mjs';

const { Component } = React;

class AddPostSection extends Component {
    constructor() {
        super();
    }

    handleAddPost(event) {
        event.preventDefault();

        const form = event.target

        const postImageInput = form['post-image-input'];
        const postCaptionInput = form['post-caption-input'];

        const postImage = postImageInput.value;
        const postCaption = postCaptionInput.value;

        try {
            logic.addPost(postImage, postCaption);

            this.props.onPostCreated();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleCancel(event) {
        event.stopPropagation();

        if (event.target.className === 'fader')
            this.props.onCancel();
    }

    handleCancelButton() {
        this.props.onCancel();
    }

    render() {
        return <div className="fader" onClick={this.handleCancel.bind(this)}>
            <section className="newposts">
                <h2>Create Post</h2>
                <form className="form" onSubmit={this.handleAddPost.bind(this)}>
                    <div className="form__field">
                        <label htmlFor="post-image-input">Image:</label>
                        <input id="post-image-input" className="form__input" type="text" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="post-caption-input">Caption:</label>
                        <input id="post-caption-input" className="form__input" type="text" />
                    </div>
                    <button className="form__button" type="submit">Create</button>
                    <button className="form__button" type="button" onClick={this.handleCancelButton.bind(this)}>Cancel</button>
                </form>
            </section>
        </div>
    }
}

export default AddPostSection;