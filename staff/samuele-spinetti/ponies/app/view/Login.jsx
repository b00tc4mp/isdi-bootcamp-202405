import logic from '../logic'

import Link from './components/Link'
import Heading from './components/Heading'
import Input from './components/Input'
import Form from './components/Form'
import Container from './components/Container'
import Label from './components/Label'
import Button from './components/Button'

import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError } = errors

function Login({ onLogin, onRegisterClick }) {
    const handleLoginSubmit = event => {
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
        event.preventDefault()

        onRegisterClick()
    }

    return <main className="flex flex-col items-center gap-4 text-[1rem]">
        <Heading>Login</Heading>

        <Container className={"box"}>

            <Form className={"flex flex-col gap-1 min-w-[80%]"} onSubmit={handleLoginSubmit}>
                <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                    <Label htmlFor={"username-input"}>Username</Label>
                    <Input className={"text-inherit rounded-[20px] border-white"} type={"text"} id={"username-input"} name={"username"} />
                </Container>

                <Container className={"flex flex-col gap-[0.5rem] min-w-[80%]"}>
                    <Label htmlFor={"password-input"}>Password</Label>
                    <Input className={"text-inherit rounded-[20px] border-white"} type={"password"} id={"password-input"} name={"password"} />
                </Container>

                <Button className={"text-inherit rounded-[20px]"} type={"submit"}>Login</Button>
            </Form>
        </Container>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>
}


export default Login