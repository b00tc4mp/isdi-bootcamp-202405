import logic from '../logic'

import Heading from './components/Heading'
import Container from './components/Container'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Button from './components/Button'
import Link from './components/Link'

function Register({ onRegister, onLoginClick }) {
    console.debug('Register -> call')

    const handleRegisterSubmit = event => {
        console.debug('Register -> handleRegisterSubmit')

        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
            })

            alert('user successfully registered')

            onRegister()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        console.debug('Register -> handleLoginClick')

        event.preventDefault()

        onLoginClick()
    }

    return <main className="view">
        <Heading>Register</Heading>

        <Form onSubmit={handleRegisterSubmit} >
            <Container className="form__field Container--column Container--column-left">
                <Label htmlFor="name-input">{'Name'}</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="form__field Container--column Container--column-left">
                <Label htmlFor="surname-input">{'Surname'}</Label>
                <Input type="text" id="surname-input" name="surname" placeholder="surname" />
            </Container>

            <Container className="form__field Container--column Container--column-left">
                <Label htmlFor="email-input">{'Email'}</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="form__field Container--column Container--column-left">
                <Label htmlFor="username-input">{'Username'}</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="form__field Container--column Container--column-left">
                <Label htmlFor="password-input">{'Password'}</Label>
                <Input type="password" name="password" id="password-input" placeholder="password" />
            </Container>

            <Container className="form__field Container--column Container--column-left">
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
                <Input type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
            </Container>

            <Button className="form__button" type="submit">{'Register'}</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>

}

export default Register