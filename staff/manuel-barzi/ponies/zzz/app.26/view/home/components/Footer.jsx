import logic from "../../../logic/index.mjs"

const { Component } = React

class Footer extends Component {
    constructor() {
        console.debug('Footer -> constructor')

        super()

        this.state = { createPostVisible: false }
    }

    handleCreatePostClick() {
        console.debug('Footer -> handleCreatePostClick')

        this.setState({ createPostVisible: true })
    }

    handleCancelCreatePostClick() {
        console.debug('Footer -> handleCancelCreatePostClick')

        this.setState({ createPostVisible: false })
    }

    handleCreatePostSubmit(event) {
        console.debug('Footer -> handleCreatePostSubmit')

        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postCaptionInput = form['post-caption-input']

        const postImage = postImageInput.value
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption)

            this.setState({ createPostVisible: false })

            this.props.onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Footer -> render')

        return <footer className="footer">
            <button className="Button" onClick={this.handleCreatePostClick.bind(this)}>＋</button>

            {this.state.createPostVisible && <section className="create-post-section">
                <h2 className="create-post-section__title">Create Post</h2>

                <form className="form" onSubmit={this.handleCreatePostSubmit.bind(this)}>
                    <div className="form__field">
                        <label htmlFor="post-image-input">Image</label>
                        <input className="form__input" id="post-image-input" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="post-caption-input">Caption</label>
                        <input className="form__input" id="post-caption-input" />
                    </div>

                    <div className="create-post-section__buttons">
                        <button className="Button" type="submit">✅</button>
                        <button className="Button" type="reset" onClick={this.handleCancelCreatePostClick.bind(this)}>ｘ</button>
                    </div>
                </form>
            </section>}
        </footer>
    }
}

export default Footer