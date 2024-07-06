import logic from "../../../logic/index.mjs"

import Button from "../../components/Button"
import Input from "../../components/Input"
import Label from "../../components/Label"
import Form from "../../components/Form"
import Heading from "../../components/Heading"

const { Component } = React

class Footer extends Component {
    constructor() {
        console.debug('Footer -> constructor')

        super()

        this.state = { createPostVisible: false }  //se inicializa el estado de createPostVisible en false (para que no se muestre)
    }

    handleCreatePostClick() {
        console.debug('Footer -> handleCreatePostClick')

        this.setState({ createPostVisible: true })  //se cambia el estado decreatePostVisible a true (para que se muestre)
    }

    handleCancelCreatePostClick() {
        console.debug('Footer -> handleCancelCreatePostClick')

        this.setState({ createPostVisible: false })  //se cambia el estado de createPostVisible en false (para que deje de mostrarse)
    }

    handleCreatePostSubmit(event) {
        console.debug('Footer -> handleCreatePostSubmit')

        event.preventDefault()

        const form = event.target  //el elemento sobre el que se va a dirigir la acción

        const postImageInput = form['post-image-input']  //se recoge el elemento HTML del input de la imagen
        const postCaptionInput = form['post-caption-input']   //se recoge el elemento HTML del input del caption

        const postImage = postImageInput.value  //se recoge el valor del input de la imagen
        const postCaption = postCaptionInput.value   //se recoge el valor del input del caption

        try {
            logic.createPost(postImage, postCaption)  //actualiza el PostList

            this.setState({ createPostVisible: false })  //cambia el estado de createPostVisible a false para que deje de mostrarse

            this.props.onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }



    render() {
        console.debug('Footer -> render')

        return <footer className="footer">
            <Button className={"Button add-post-button"} onClick={this.handleCreatePostClick.bind(this)} text={"+"} />

            {this.state.createPostVisible && <section className={"create-post-section"}>
                <Heading level={2} className={"create-post-section__title"} text={"Create Post"} />

                <Form className={"form"} onSubmit={this.handleCreatePostSubmit.bind(this)}>
                    <div className="form__field">
                        <Label htmlFor={"post-image-input"} text={"Image"} />
                        <Input className={"form__input"} id={"post-image-input"} />
                    </div>
                    <div className="form__field">
                        <Label htmlFor={"post-caption-input"} text={"Caption"} />
                        <Input className={"form__caption-input"} id={"post-caption-input"} />
                    </div>

                    <div className="create-post-section__buttons">
                        <Button className={"form__button"} type={"submit"} text={"Create"} />
                        <Button className={"form__button"} type={"reset"} onClick={this.handleCancelCreatePostClick.bind(this)} text={"Cancel"} />
                    </div>
                </Form>
            </section>}
        </footer>
    }
}


export default Footer