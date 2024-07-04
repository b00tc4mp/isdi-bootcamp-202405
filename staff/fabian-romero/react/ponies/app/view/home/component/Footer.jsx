import logic from "../../../logic/index.mjs"

const { Component } = React // esto es lo primero que se hace la clase y esta formula

class Footer extends Component {
    constructor() {
        console.debug('footer -> constructor')
        super()

        this.state = { createPostVisible: false }
    }

    handleCreatePostClick() {
        console.debug('Footer -> handleCreatePostClick')

        this.setState({ createPostVisible: true }) // como se llegó a esta conclusion?? // seState provoca una act de este estado y de forma asoncronnai esto repinta... // preguntar mejor
    }

    handleCancelCreatePostClick() { // cuando y por qué se usan estas cosas ?
        console.debug('Footer -> handleCancelCreatePostCLick')

        this.setState({ createPostVisible: false }) // cuando se cuando se usa state o el otro?
    }

    handleCreatePostSubmit(event) { //se crea info en internet para subir un post
        console.debug('Footer -> handleCreatePostSubmit')

        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input'] // aqui accedemos al input
        const postCaptionInput = form['post-caption-input']

        const postImage = postImageInput.value // aqui recogemos los valores, usuarios y datos...
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption)

            this.setState({ createPostVisible: false })

            this.props.onPostCreated() // cuando le pasas una propiedad del padre al hijo.. quieres que la "funcion padre" se entere de los cambios. y esta info se esta renderizando en el index
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Footer -> render')

        return <footer className="footer">
            <button className="Button" onClick={this.handleCreatePostClick.bind(this)}>+</button>

            {this.state.createPostVisible && <section className="create-post-section">
                <h3 className="create-post-section__title">Create Post</h3>

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
                        <button className="Button" type="submit"> ✅ </button>
                        <button className="Button" type="reset" onClick={this.handleCancelCreatePostClick.bind(this)}> ❌ </button>
                    </div>
                </form>
            </section>}
        </footer>
    }
}

export default Footer