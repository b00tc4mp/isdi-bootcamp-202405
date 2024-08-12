import logic from '../../../logic'

import { Component } from 'react'

class Footer extends Component {
    constructor() {
        super()

        this.state = { createPostVisible: false }
    }

    handleCreatePostClick() {
        this.setState({ createPostVisible: true })
    }

    handleCancelCreatePostClick() {
        this.setState({ createPostVisible: false })
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

            this.setState({ createPostVisible: false })

            this.props.onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {

        return <footer className="footer">

            <button className="add-post-button" onClick={this.handleCreatePostClick.bind(this)}>+</button>

            {this.state.createPostVisible && <section className="create-post-section">

                <h2 className="create-post-section__title">Create Post</h2>

                <form className="form" onSubmit={this.handleCreatePostSubmit.bind(this)}>
                    <div className="form__field">
                        <label htmlFor="post-image-input">Image</label>
                        <input className="form__input" id="post-image-input" type="text" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="post-caption-input">Caption</label>
                        <input className="form__input" id="post-caption-input" type="text" />
                    </div>

                    <div className="create-post-section__buttons">
                        <button className="form__button" type="submit">Create</button>
                        <button className="form__button" type="reset" onClick={this.handleCancelCreatePostClick.bind(this)}>Cancel</button>
                    </div>

                </form>
            </section>}
        </footer>
    }
}

export default Footer