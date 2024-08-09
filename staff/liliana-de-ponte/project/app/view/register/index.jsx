import logic from '../../logic'

import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Link from '../library/Link'

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

        <Form onSubmit={handleRegisterSubmit} className="flex-col gap-[0.9rem">
            <Container className="flex-col items-start">
                <Input type="text" id="name-input" name="name" placeholder="name" />
                <Input type="text" id="surname-input" surname="surname" placeholder="surname" />
                <Input type="email" id="email-input" name="email" placeholder="email" />
                <Input type="text" id="username-input" name="username" placeholder="username" />
                <Input type="password" id="password-input" name="password" placeholder="password" />
                <Input type="password" id="password2-input" name="password2" placeholder="repeat password" />
            </Container>

            <Button type="submit">Register</Button>
        </Form>

        <Link href="" onClick={handleLoginClick}>Login</Link>

    </main>

}