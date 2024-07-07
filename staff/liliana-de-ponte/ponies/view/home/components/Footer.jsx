import logic from "../../../logic/index.mjs"
import Button from "../../components/Button"
import Heading from "../../components/Heading"
import Form from "../../components/Form"
import Label from "../../components/Label"
import Input from "../../components/Input"

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
        console.debug('Footer -> handleCancetCreatePostClick')

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
            <Button className={"Button"} onClick={this.handleCreatePostClick.bind(this)} text={"+"} />

            {this.state.createPostVisible && <section className="create-post-section">
                <Heading level={2} className={"create-post-section__title"} text={"Create Post"} />

                <Form className={"form"} onSubmit={this.handleCreatePostSubmit.bind(this)}>
                    <div className="form__field">
                        <Label htmlFor={"post-image-input"} text={"Image"} />
                        <Input className={"form__input"} id={"post-image-input"} />
                    </div>

                    <div className="form__field">
                        <Label htmlFor={"post-caption-input"} text={"Caption"} />
                        <Input className={"form__input"} id={"post-caption-input"} />
                    </div>

                    <div className="create-post-section__buttons" >
                        <Button className={"Button"} type={"submit"} text={"Create"} />
                        <Button className={"Button"} type={"reset"} onClick={this.handleCancelCreatePostClick.bind(this)} text={"Cancel"} />
                    </div>
                </Form>
            </section>}
        </footer >
    }
}

export default Footer
