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
                        message = 'incorrect username or password'

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

    return <main className=" flex flex-col items-center gap-4 text-base bg-gradient-to-l from-purple-100 to-indigo-300 text-purple-700 min-h-screen">
        <Container className="fixed start-0 top-0 w-full flex justify-end items-center bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] text-[30px] pt-[7px] pb-[7px] font-over text-3xl">Ponies</Container>

        <Heading className="mt-14 font-bold text-3xl flex" level={1}>Login</Heading>

        <Form className={"Form"} onSubmit={handleLoginSubmit}>
            <Container className="flex flex-col ">
                <Label htmlFor={"username-input"}>Username</Label>
                <Input type={"text"} id={"username-input"} name={"username"} placeholder={"username"} />
            </Container>

            <Container className="flex flex-col ">
                <Label htmlFor={"password-input"}>Password</Label>
                <Input type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
            </Container>

            <Button className={"bg-gradient-to-r from-purple-600 to-cyan-400  text-[white] rounded-[10px] border-[none] shadow-[0_4px_8px_rgba(0,0,0,0.2)] px-[.2rem] mt-[1rem]"} type={"submit"}>Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>

    </main>

}

export default Login