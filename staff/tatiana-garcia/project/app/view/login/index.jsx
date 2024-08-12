import logic from '../../logic/index.js'

import Container from '../library/Container.jsx'

import useContext from '../context.js'

import { errors } from '../../../com/index.js'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onlogin, onRegisterClick }) {
    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)
                .then(() => onlogin())
                .catch(error => {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect username and/or password'

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    return <main>
        <header>Login</header>

        <form onSubmit={handleLoginSubmit}>
            <Container>
                <label htmlFor='username-input'>Nombre de usuario</label>
                <input type='text' id='username-input' name='username' placeholder='nombre de usuario' />
            </Container>

            <Container>
                <label htmlFor='password-input'>Contraseña</label>
                <input type='password' id='password-input' name='password' placeholder='contraseña' />
            </Container>

            <button type='submit'>Login</button>
        </form>

        <link onClick={handleRegisterClick}>Registro</link>

    </main>
}