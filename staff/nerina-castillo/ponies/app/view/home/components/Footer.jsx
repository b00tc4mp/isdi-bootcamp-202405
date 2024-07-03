import logic from "../../../logic/index.mjs";

const { Component } = React

class Footer extends Component {
    constructor() {
        super()

    }

    state = { showing: false }

    handleCreatePostSubmit(event) {
        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postCaptionInput = form['post-caption-input']

        const postImage = postImageInput.value
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption);
            this.setState({ showing: false });

            this.onPostCreatedCallback();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    handlePostCreated(callback) {
        this.handlePostCreatedCallback = callback
    }

    render() {
        const { showing } = this.state
        return <footer className="footer">
            <button className="Button add-post-button" onClick={() => this.setState({ showing: !showing })}>+</button>
            <section className="create-post-section" style={{ display: (showing ? 'block' : 'none') }}>
                <h2 className="create-post-section__title">Create Post</h2>
                <form className="form__input" onSubmit={this.handleCreatePostSubmit}>
                    <div className="form__field">
                        <label htmlFor="post-image-input"></label>
                        <input className="form__input" id="post-image-input" />
                    </div>
                    <div className="form__field">
                        <label htmlFor="post-caption-input"></label>
                        <input className="form__caption-input" id="post-caption-input" />
                    </div>
                    <div className="create-post-section__buttons">
                        <button className="form__button " type="submit">Create</button>
                        <button className="form__button " type="reset">Cancel</button>
                    </div>
                </form>
            </section>
        </footer>
    }
}

export default Footer