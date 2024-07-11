import logic from '../logic'

import Link from './components/Link'
import Heading from './components/Heading'
import Input from './components/Input'
import Label from './components/Label'
import Button from './components/Button'
import Container from './components/Container'
import Form from './components/Form'

function Register({ onRegister, onLoginClick }) {
    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

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

            alert('user successfully registered')

            onRegister()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <main className="view">
        <Heading>Register</Heading>

        <Form className="form" onSubmit={handleRegisterSubmit}>
            <Container className={"form__field"}>
                <Label htmlFor={"name-input"}>Name</Label>
                <Input className={"form__input"} type={"text"} id={"name-input"} name={"name"} placeholder={"Name"} />
            </Container>

            <Container className={"form__field"}>
                <Label htmlFor={"surname-input"}>Surname</Label>
                <Input className={"form__input"} type={"text"} id={"surname-input"} name={"surname"} placeholder={"Surname"} />
            </Container>

            <Container className={"form__field"}>
                <Label htmlFor={"email-input"}>Email</Label>
                <Input className={"form__input"} type={"email"} id={"email-input"} name={"email"} placeholder={"Email"} />
            </Container>

            <Container className={"form__field"}>
                <Label htmlFor={"username-input"}>Username</Label>
                <Input className={"form__input"} type={"text"} id={"username-input"} name={"username"} placeholder={"Username"} />
            </Container>

            <Container className={"form__field"}>
                <Label htmlFor={"password-input"}>Password</Label>
                <Input className={"form__input"} type={"password"} id={"password-input"} name={"password"} placeholder={"Password"} />
            </Container>

            <Container className={"form__field"}>
                <Label htmlFor={"password2-input"}>Repeat Password</Label>
                <Input className={"form__input"} type={"password"} id={"password2-input"} name={"password-repeat"} placeholder={"Repeat Password"} />
            </Container>

            <Button className={"form__button"} type={"submit"}>Register</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>
}

export default Register