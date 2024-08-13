import logic from '../../logic/index.mjs'

import { Component } from 'react'

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
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            location.href = '../login'

            alert('user successfully registered')
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
                    <label htmlFor="name-input"></label>
                    <input className="form__input" type="text" id="name-input" name="name" placeholder="Name" />
                </div>

                <div className="form__field">
                    <label htmlFor="surname-input"></label>
                    <input className="form__input" type="text" id="surname-input" name="surname" placeholder="Surname" />
                </div>

                <div className="form__field">
                    <label htmlFor="email-input"></label>
                    <input className="form__input" type="email" id="email-input" name="email" placeholder="email" />
                </div>

                <div className="form__field">
                    <label htmlFor="username-input"></label>
                    <input className="form__input" type="text" id="username-input" name="username" placeholder="username" />
                </div>

                <div className="form__field">
                    <label htmlFor="password-input"></label>
                    <input className="form__input" type="password" id="password-input" name="password" placeholder="password" />
                </div>

                <div className="form__field">
                    <label htmlFor="password-repeat-input"></label>
                    <input className="form__input" type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
                </div>

                <button type="submit">Register</button>

                <a href=""
                    target='_blank'
                    className='form__button'
                    onClick={this.handleLoginClick}>Login</a>
            </form>
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)