import logic from '../../logic/index.mjs'

import { Component } from 'react'

class Login extends Component {
    constructor() {
        console.debug('Login -> constructor')

        super()
        this.state = { whatTime: '' }
    }

    handleRegisterClick(event) {
        event.preventDefault()

        location.href = '../register'
    }

    handleLoginSubmit(event) {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)

            location.href = '../home'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className="view">
            <div className="status_bar">
                <div className="time_left_side">
                    <p className="time">{this.state.whatTime}</p>
                </div>

            </div>
            <h1>Login</h1>
            <div className="div_form">
                <form className="form" onSubmit={this.handleLoginSubmit}>
                    <div className="form__field">
                        <label htmlFor="username-input"></label>
                        <input
                            className="form__input"
                            type="text"
                            id="username-input"
                            name="username"
                            placeholder="username"
                        />
                    </div>

                    <div className="form__field">
                        <label htmlFor="password-input"></label>
                        <input
                            className="form__input"
                            type="password" 
                            id="password-input"
                            name="password"
                            placeholder="password"
                        />
                    </div>

                    <button className="form__button" id="login_button" type="submit">Login</button>
                    {/* <Button className={"form__button"} type={"submit"} text={'Login'} /> */}
                    <a href=""
                        target='_blank'
                        className='form__button'
                        onClick={this.handleRegisterClick}
                    >Register
                    </a>
                </form>
            </div>

        </main >

    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Login />)