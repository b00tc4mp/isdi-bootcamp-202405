import logic from '../logic'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError } = errors

function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

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

    return <main className="flex flex-col items-center gap-4 text-[1.1rem]">
        <Heading className="m-0 italic text-purple-900 text-3xl">Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="flex-col">
            <Container className="flex-col items-star flex justify-center gap-4" >
                <Label htmlFor="username-input">{'Username'}</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col items-star">
                <Label htmlFor="password-input">{'Password'}</Label>
                <Input className="text-[length:inherit] rounded-[5px] border-[1px] border-indigo-600 text-black p-[.2rem] shadow-black w-full" type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button className='rounded-2xl text-[length:inherit] bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold text-rgb(88, 5, 88)' type="submit">{'Login'}</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>
}

export default Login