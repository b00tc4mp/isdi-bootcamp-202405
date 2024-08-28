import logic from '../../logic'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'

import useContext from '../context'

import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const { alert } = useContext()

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)
                .then(() => onLogin())
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
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    return <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-cyan-50 to-cyan-200 text-gray-800 p-8">
        <Heading
            level="1"
            className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-4"
        >
            ⚡️Login⚡️
        </Heading>

        <Form
            onSubmit={handleLoginSubmit}
            className="flex flex-col items-center gap-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-2xl w-full max-w-xs"
        >
            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="username-input" className="text-base font-medium text-gray-700">
                    Username
                </Label>
                <Input
                    type="text"
                    id="username-input"
                    name="username"
                    placeholder="username"
                    className="w-full mt-1 p-2 bg-white border border-cyan-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="password-input" className="text-base font-medium text-gray-700">
                    Password
                </Label>
                <Input
                    type="password"
                    id="password-input"
                    name="password"
                    placeholder="password"
                    className="w-full mt-1 p-2 bg-white border border-cyan-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </Container>

            <Button
                type="submit"
                className="mt-3 px-4 py-2 bg-cyan-300 text-gray-800 border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-400 hover:text-yellow-500"
            >
                Login
            </Button>
        </Form>

        <Link
            onClick={handleRegisterClick}
            className="mt-3 text-xs text-cyan-600 hover:text-yellow-500 transition-colors"
        >
            Register
        </Link>
    </main>
}    
