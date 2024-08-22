import logic from '../../logic/index.js'

import useContext from '../context.js'

import Heading from '../library/Heading'
import Form from '../library/Form'
import Container from '../library/Container'
import Span from '../library/Span'
import Label from '../library/Label'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Link from '../library/Link'

import { errors } from 'com'
const { NotFoundError, CredentialsError } = errors

export default function Login({ onLogin, onRegisterClick }) {
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

    return <main className="flex flex-col justify-center items-center bg-gradient-to-br from-green-400 to-fuchsia-500 h-screen w-screen">
        <Heading className="fixed top-0 p-10 font-bold text-[60px]">QueerCare</Heading>

        <Heading level="2" className="font-medium text-[35px] fixed top-1/4">Sign in</Heading>

        <Form className="flex flex-col justify-center items-center" onSubmit={handleLoginSubmit}>
            <Container className="group">
                <Input id="username-input" name="username" type="text" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="username-input" className="text-xl">Username</Label>
            </Container>
            <Container className="group">
                <Input id="password-input" name="password" type="password" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="password-input" className="text-xl">Password</Label>
            </Container>
            <Button className="border-black text-[18px] border rounded w-20" type="submit">Login</Button>
        </Form>

        <Container className="flex flex-col items-center fixed bottom-0 p-10 gap-6">
            <Link onClick={handleRegisterClick}><Span className="text-2xl">Register <Span className="font-bold">here</Span></Span></Link>
            <Paragraph>or Sign in with</Paragraph>

            <Container className="flex flex-row justify-around gap-16">
                <Image src="/facebookIcon.svg" className="w-[50px] h-[50px]" />
                <Image src="/instagramIcon.svg" className="w-[50px] h-[50px]" />
                <Image src="/linkedinIcon.svg" className="w-[50px] h-[50px]" />
            </Container>
        </Container>
    </main >
}