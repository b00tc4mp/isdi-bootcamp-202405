import logic from '../../logic/index.js'
import { useContext } from 'react'
import Context from '../../Context'

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

export default function Register({ onRegister, onLoginClick }) {
    const { alert } = useContext(Context)

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target
        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const usernameInput = form['username-input']
        const emailInput = form['email-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const username = usernameInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value
        try {
            logic.registerUser(name, surname, username, email, password, passwordRepeat)
                .then(() => {
                    onRegister()

                    alert('user successfully registered')
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }
    return <main className="flex flex-col justify-center items-center bg-gradient-to-br from-green-400 to-fuchsia-500 h-screen w-screen">

        <Heading className="font-medium text-[35px] fixed top-0 p-10">Sign up</Heading>

        <Form className="flex flex-col justify-center items-center" onSubmit={handleRegisterSubmit}>
            <Container className="group">
                <Input id="name-input" name="name" type="text" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="name-input">Name</Label>
            </Container>
            <Container className="group">
                <Input id="surname-input" name="surname" type="text" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="surname-input">Surname</Label>
            </Container>
            <Container className="group">
                <Input id="username-input" name="username" type="text" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="username-input">Username</Label>
            </Container>
            <Container className="group">
                <Input id="email-input" name="email" type="text" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="email-input">Email</Label>
            </Container>
            <Container className="group">
                <Input id="password-input" name="password" type="password" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="password-input">Password</Label>
            </Container>
            <Container className="group">
                <Input id="password-repeat-input" name="password-repeat" type="password" required />
                <Span className="highlight"></Span>
                <Span className="bar"></Span>
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
            </Container>
            <Button className="border-black text-[18px] border rounded w-20" type="submit">Register</Button>
        </Form><br />
        <Link onClick={handleLoginClick}>Back</Link>

        <Container className="flex flex-col items-center fixed bottom-0 p-10 gap-6">
            <Paragraph>Sign in with</Paragraph>

            <Container className="flex flex-row justify-around gap-16">
                <Image src="/facebookIcon.svg" className="w-[50px] h-[50px]" />
                <Image src="/instagramIcon.svg" className="w-[50px] h-[50px]" />
                <Image src="/linkedinIcon.svg" className="w-[50px] h-[50px]" />
            </Container>
        </Container>
    </main>
}