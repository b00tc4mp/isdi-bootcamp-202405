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

    return <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900 p-8 text-blue-300">
        <Heading
            level="1"
            className="text-4xl font-bold tracking-wide text-transparent bg-clip-text text-orange-400 mb-8"
        >
            ⚡️Login⚡️
        </Heading>

        <Form
            onSubmit={handleLoginSubmit}
            className="flex flex-col items-center gap-4 bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-lg w-full max-w-sm"
        >
            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="username-input" className="text-lg font-medium text-blue-400">
                    Username
                </Label>
                <Input
                    type="text"
                    id="username-input"
                    name="username"
                    placeholder="Enter your username"
                    className="w-full mt-2 p-3 bg-transparent border border-blue-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </Container>

            <Container className="flex flex-col items-start w-full">
                <Label htmlFor="password-input" className="text-lg font-medium text-blue-400">
                    Password
                </Label>
                <Input
                    type="password"
                    id="password-input"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full mt-2 p-3 bg-transparent border border-blue-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </Container>

            <Button
                type="submit"
                className="mt-4 px-6 py-3 bg-gradient-to-b from-cyan-800 via-gray-800 to-cyan-800 p-8  text-orange-400 rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
            >
                Login
            </Button>
        </Form>

        <Link
            onClick={handleRegisterClick}
            className="mt-4 text-sm text-orange-400 hover:text-teal-300 transition-colors"
        >
            Register
        </Link>
    </main>

}      