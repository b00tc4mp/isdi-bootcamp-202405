import logic from '../../logic/index.mjs'

const { Component } = React

class Register extends Component {
    constructor() {
        super()
    }

    handleLoginClick(event) {
        event.preventDefault()

        location.href = '../login'
    }

    handleRegisterSubmit(event) {
        event.preventDefault()

        const form = event.target

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

            alert('user successfully registred')

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className="view">
            <h1>Register</h1>

            <form className="form" onSubmit={this.handleRegisterSubmit} >
                <div className="form__field">
                    <label htmlFor="name-input">Name</label>
                    <input className="form__input" type="text" id="name-input" name="name" placeholder="name" />
                </div>

                <div className="form__field">
                    <label htmlFor="surname-input">Surname</label>
                    <input className="form__input" type="text" id="surname-input" name="surname" placeholder="surname" />
                </div>

                <div className="form__field">
                    <label htmlFor="email-input">Email</label>
                    <input className="form__input" type="email" id="email-input" name="email" placeholder="email" />
                </div>

                <div className="form__field">
                    <label htmlFor="username-input">Username</label>
                    <input className="form__input" type="text" id="username-input" name="username" placeholder="username" />
                </div>

                <div className="form__field">
                    <label htmlFor="password-input">Password</label>
                    <input className="form__input" type="password" name="password" id="password-input" placeholder="password" />
                </div>

                <div className="form__field">
                    <label htmlFor="password2-input">Repeat password</label>
                    <input className="form__input" type="password" name="password2" id="password2-input" placeholder="repeat password" />
                </div>

                <button className="form__button" type="submit">Register</button>
            </form>

            <a href="" onClick={this.handleLoginClick}>Login</a>
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)