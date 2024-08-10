import logic from '../logic/index.mjs'

import Form from './components/Form'
import Label from './components/Label'
import Button from './components/Button'
import Link from './components/Link'
import Heading from './components/Heading'
import Input from './components/Input'
import Container from './components/Container'

function Register({ onRegister, onLoginClick }) {
    console.debug('Register -> call')


    const handleRegisterSubmit = event => {
        console.debug('Register -> handleRegisterSubmit')

        event.preventDefault() //para que no se resetee la pagina

        const form = event.target //apunta al elemento que provoca el evento

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

    const handleLoginClick = event => {
        console.debug('Register -> handleLoginClick  ')

        event.preventDefault()

        onLoginClick()
    }
    return <main className="view">
        <Heading>Register</Heading>

        <Form onSubmit={handleRegisterSubmit} className="Form--column">
            <Container className="Container--column Container--column-left" >
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name-input" name="name" placeholder="name" />
            </Container>

            <Container className="Container--column Container--column-left" >
                <Label htmlFor="surname">Surname</Label>
                <Input type="text" id="surname-input" surname="surname" placeholder="surname" />
            </Container>

            <Container className="Container--column Container--column-left" >
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container className="Container--column Container--column-left" >
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username-input" name="username"
                    placeholder="username" />
            </Container>

            <Container className="Container--column Container--column-left" >
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className="Container--column Container--column-left" >
                <Label htmlFor="password2">Repeat Password</Label>
                <Input type="password" id="password2-input" name="password2"
                    placeholder="repeat password" />
            </Container>

            <Button className="Button--form" type="submit">Register</Button>
        </Form >

        <Link href="" onClick={handleLoginClick}>Login</Link>
    </main >

}


export default Register 