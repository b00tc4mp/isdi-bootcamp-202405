import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Form from '../library/Form'
import Label from '../library/Label'
import Input from '../library/Input'
import Container from '../library/Container'
import Link from '../library/Link'
import Button from '../library/Button'
import useContext from '../context.js'
import { errors } from 'com'

const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
    // console.debug('Login -> call')

    const { alert } = useContext()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [])

    const handleLoginSubmit = event => {
        // console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

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
        // console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    const isButtonDisabled = !username || !password

    return (
        <main className="flex flex-col items-center justify-start mt-2 h-vh p-4 font-poppins text-lg text-title bg-white dark:bg-inherit">
            <div className="flex flex-col items-start w-full max-w-md gap-6">

                <div className="flex flex-row items-baseline gap-2">
                    <Heading level={2} className="text-xl dark:text-dark_white">
                        Welcome back to
                    </Heading>
                    <Heading level={1} className="text-4xl font-bevan font-bold text-cities ml-2">
                        cities
                    </Heading>
                </div>

                <div className="flex flex-col justify-start gap-2">
                    <Paragraph className="text-4xl dark:text-dark_white font-medium mb-10">
                        Sign in
                    </Paragraph>
                </div>

                <button className="flex items-center gap-2 py-1 pr-4 rounded-lg font-light text-[14px] bg-blue-50 text-sea">
                    <img src="/logo/logoGoogle.png" alt="Google Icon" className="w-12 h-15 m-0 p-0" />
                    Sign in with Google
                </button>

                <Form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 w-full">

                    <Container className="flex-col items-start w-full">
                        <Label htmlFor="username-input" className="text-md dark:text-dark_white">
                            Enter your username or email address
                        </Label>
                        <Input type="text" id="username-input" name="username" placeholder="Username or email address" className="border rounded-lg p-2 w-full text-md font-light text-light_grey" value={username} onChange={event => setUsername(event.target.value)} />
                    </Container>

                    <Container className="flex-col items-start w-full">
                        <Label htmlFor="password-input" className="dark:text-dark_white">
                            Enter your password
                        </Label>

                        <Input type="password" id="password-input" name="password" placeholder="Password" className="border rounded-lg p-2 w-full text-md font-light text-light_grey" value={password} onChange={event => setPassword(event.target.value)} />
                    </Container>

                    <Link className="font-light text-sea self-start text-sm mb-10">
                        Forgot Password?
                    </Link>

                    <Button type="submit" className={`w-full py-2 rounded-lg shadow-md ${isButtonDisabled ? 'bg-dark_white cursor-not-allowed text-light_grey' : 'bg-sea text-white'}`} disabled={isButtonDisabled}>
                        Sign in
                    </Button>
                </Form>

                <Paragraph className="text-[13px] text-light_grey dark:text-dark_white">
                    No Account?{' '}
                    <Link onClick={handleRegisterClick} className="font-light text-sea ">
                        Sign up
                    </Link>
                </Paragraph>
            </div>
        </main>
    )
}