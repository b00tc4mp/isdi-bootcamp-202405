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
            <Container className="flex-col items-center gap-4">
                <Input className=" h-9 w-11/12" type="text" id="name-input" name="name" placeholder="Name" />

                <Input className=" h-9 w-11/12" type="text" id="surname-input" surname="surname" placeholder="Surname" />

                <Input className=" h-9 w-11/12" type="email" id="email-input" name="email" placeholder="Email" />

                <Input className=" h-9 w-11/12" type="text" id="username-input" name="username" placeholder="Username" />

                <Input className=" h-9 w-11/12" type="password" id="password-input" name="password" placeholder="Password" />

                <Input className=" h-9 w-11/12" type="password" id="password2-input" name="password2" placeholder="Repeat Password" />

                <Button className="bg-[#050968] w-11/12" type="submit">Register</Button>
            </Container>
        </Form>

        <Container className="text-[#9747FF] font-bold p-8 text-lg">
            <Link href="" onClick={handleLoginClick}>Login</Link>
        </Container>
    </main>

}