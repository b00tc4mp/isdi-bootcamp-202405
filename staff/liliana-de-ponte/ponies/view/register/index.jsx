import logic from '../../logic/index.mjs'

const Component = React.Component

class Register extends Component {
    constructor() {
        super()
    }

    handleLoginClick(event) {
        event.preventDefault()

        location.href = '../login'
    }

    handleRegisterSubmit(event) {
        event.preventDefault() //para que no se resetee la pagina

        const form = event.target //apunta al elemento que provoca el evento

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password2-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            alert('user successfully registered')

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className="view">
            <h1>Register</h1>

            <form className="form" onSubmit={this.handleRegisterSubmit}>
                <div className="form__field">
                    <label htmlFor="name">Name</label>
                    <input className="form__input" type="text" id="name-input" name="name" placeholder="name" />
                </div>

                <div className="form__field">
                    <label htmlFor="surname">Surname</label>
                    <input className="form__input" type="text" id="surname-input" surname="surname" placeholder="surname" />
                </div>

                <div className="form__field">
                    <label htmlFor="email">Email</label>
                    <input className="form__input" type="email" id="email-input" name="email" placeholder="email" />
                </div>

                <div className="form__field">
                    <label htmlFor="username">Username</label>
                    <input className="form__input" type="text" id="username-input" name="username"
                        placeholder="username" />
                </div>

                <div className="form__field">
                    <label htmlFor="password">Password</label>
                    <input className="form__input" type="password" id="password-input" name="password" placeholder="password" />
                </div>

                <div className="form__field">
                    <label htmlFor="password2">Repeat Password</label>
                    <input className="form__input" type="password" id="password2-input" name="password2"
                        placeholder="repeat password" />
                </div>

                <button className="form__button" type="submit">Register</button>
            </form>

            <a href="" onClick={this.handleLoginClick}>Login</a>
        </main>

    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)