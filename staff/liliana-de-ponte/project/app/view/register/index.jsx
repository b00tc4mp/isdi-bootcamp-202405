import logic from '../../logic'

import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Link from '../library/Link'
import Image from '../library/Image'

//context

export default function Register({ onRegister, onLoginClick }) {

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password2-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)
                .then(() => onRegister())
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


    return <main>
        <Container className="flex-col items-center justify-center">
            <Image className="flex align-center h-32 w-32" src="public/+Vibes.jpg" />
        </Container>

        <Form onSubmit={handleRegisterSubmit} className="flex-col gap-[0.9rem">
            <Container className="flex-col">
                <Input className=" h-9" type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="flex-col">
                <Input className=" h-9" type="text" id="surname-input" surname="surname" placeholder="surname" />
            </Container>

            <Container className="flex-col ">
                <Input className=" h-9" type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="flex-col ">
                <Input className=" h-9" type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="flex-col ">
                <Input className=" h-9" type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="flex-col ">
                <Input className=" h-9" type="password" id="password2-input" name="password2" placeholder="repeat password" />
            </Container>

            <Button className="bg-[#050968]" type="submit">Register</Button>
        </Form>

        <Container className="text-[#9747FF] font-bold">
            <Link href="" onClick={handleLoginClick}>Login</Link>
        </Container>
    </main>

}