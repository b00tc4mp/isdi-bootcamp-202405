
import logic from '../../../logic/index.mjs'

const { Component } = React

class Footer extends Component {
    constructor() {
        super()

        this.state = {
            isFormOpen: false
        }
    }

    handleCreatePostClick() {
        this.setState({ isFormOpen: true })
    }

    handleCancelCreatePostClick() {
        this.setState({ isFormOpen: false })
    }

    handleCreatePostSubmit(event) {
        event.preventDefault()
        const form = event.target

        const postImageInput = form['post-image-input']
        const postCaptionInput = form['post-caption-input']
        const postImage = postImageInput.value
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption)

            this.setState({ isFormOpen: false })

            this.props.onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    render() {
        return <footer className="footer">
            <button className="button" onClick={this.handleCreatePostClick.bind(this)}>+</button>
            {this.state.isFormOpen && (<section className="create-post-section">
                <h2>Create Post</h2>
                <form className="form" onSubmit={this.handleCreatePostSubmit.bind(this)}>
                    <div className="form__field">
                        <label htmlFor="post-image-input">Image</label>
                        <input type="text" className="form__input" id="post-image-input" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="post-caption-input">Caption</label>
                        <input type="text" className="form__input" id="post-caption-input" />
                    </div>

                    <div className="create-post-section__buttons">
                        <button className="form__button-submit" type="submit">Create</button>
                        <button className="form__button-cancel" type="reset" onClick={this.handleCancelCreatePostClick.bind(this)}>Cancel</button>
                    </div>
                </form>
            </section>
            )}

        </footer>

    }
}

export default Footer