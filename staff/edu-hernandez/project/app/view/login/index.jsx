import logic from '../../logic'

import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
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
                        message = 'Incorrect username and/or password'

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

    return (
        <main className="flex flex-col items-center justify-start mt-12 h-vh p-4 font-poppins text-lg text-title bg-white dark:bg-inherit">

            <div className="flex flex-col items-start w-full max-w-md gap-6">

                <div className="flex flex-row items-baseline gap-2">
                    <Heading
                        level={2}
                        className="text-xl dark:text-dark_white">
                        Welcome back to
                    </Heading>
                    <Heading
                        level={1}
                        className="text-4xl font-bevan font-bold text-cities ml-2">
                        cities
                    </Heading>
                </div>

                <div className="flex flex-col justify-start gap-2">
                    <Paragraph
                        className="text-4xl dark:text-dark_white font-medium mb-10">
                        Sign in
                    </Paragraph>
                </div>

                <button className="flex items-center gap-2 bg-blue-50 font-light text-sea px-5 py-2 rounded-lg">
                    <img
                        src="/logo/logoGoogle.png"
                        alt="Google Icon"
                        className="w-12 h-15 m-0 p-0" />
                    Sign in with Google
                </button>

                <Form
                    onSubmit={handleLoginSubmit}
                    className="flex flex-col gap-4 w-full">

                    <Container
                        className="flex-col items-start w-full">
                        <Label
                            htmlFor="username-input"
                            className="text-md dark:text-dark_white">
                            Enter your username or email address
                        </Label>
                        <Input
                            type="text"
                            id="username-input"
                            name="username"
                            placeholder="Username or email address"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey"
                        />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label htmlFor="password-input" className="dark:text-dark_white">Enter your password</Label>
                        <Input
                            type="password"
                            id="password-input"
                            name="password"
                            placeholder="Password"
                            className="border rounded-lg p-2 w-full text-md font-light text-light_grey"
                        />
                    </Container>

                    <Link
                        className="font-light text-sea self-start text-sm mb-10">
                        Forgot Password?
                    </Link>

                    <Button
                        type="submit"
                        className="bg-sea text-white w-full py-2 rounded-lg shadow-md ">
                        Sign in
                    </Button>
                </Form>

                <p
                    className="text-[13px] text-light_grey dark:text-dark_white">
                    No Account?{' '}
                    <Link
                        onClick={handleRegisterClick}
                        className="font-light text-sea ">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
}
