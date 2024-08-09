import logic from '../../logic/index.mjs'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Container from '../components/Container'
import Link from '../components/Link'
import Button from '../components/Button'

function Register() {
    const handleLoginClick = event => {
        event.preventDefault()

        location.href = '../login'
    }

    const handleRegisterSubmit = event => {
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
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            location.href = '../login'

            alert('user successfully registered')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <main className="view">
        <Heading>Register</Heading>

        <Form onSubmit={handleRegisterSubmit} className="Form--column">
            <Container className="Container--column Container--column-left">
                <Label htmlFor="name-input">Name</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="surname-input">Surname</Label>
                <Input type="text" id="surname-input" name="surname" placeholder="surname" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="email-input">E-mail</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-repeat-input">Repeat Password</Label>
                <Input type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
            </Container>

            <Button type="submit">Register</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)