import Link from './components/Link'
import Heading from './components/Heading'
import Form from './components/Form'
import Container from './components/Container'
import Label from './components/Label'
import Input from './components/Input'
import Button from './components/Button'

import logic from '../logic'

import './Register.css'

function Register({ onRegister, onLoginClick }) {
    const handleRegisterSubmit = (event) => {
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
            logic.registerUser(name, surname, email, username, password, passwordRepeat, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                alert('user succesfully registered')

                onRegister()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    return <main className="View--register">
        <Heading>Register</Heading>

        <Form className="Form--column" onSubmit={handleRegisterSubmit}>
            <Container>
                <Label htmlFor="name-input">Name:</Label>
                <Input id="name-input" type="text" name="name" placeholder="name" />
            </Container>

            <Container>
                <Label htmlFor="surname-input">Surname:</Label>
                <Input id="surname-input" type="text" name="surname" placeholder="surname" />
            </Container>

            <Container>
                <Label htmlFor="email-input">Email:</Label>
                <Input id="email-input" type="email" name="email" placeholder="email" />
            </Container>

            <Container>
                <Label htmlFor="username-input">Username:</Label>
                <Input id="username-input" type="text" name="username" placeholder="username" />
            </Container>

            <Container>
                <Label htmlFor="password-input">Password:</Label>
                <Input id="password-input" type="password" name="password" placeholder="password" />
            </Container>

            <Container>
                <Label htmlFor="password2-input">Repeat Password:</Label>
                <Input id="password2-input" type="password" name="repassword" placeholder="repeat password" />
            </Container>

            <Button className="Button--register" type="submit">Register</Button>
        </Form>

        <Link onClick={onLoginClick} text="Login" />
    </main>
}

export default Register