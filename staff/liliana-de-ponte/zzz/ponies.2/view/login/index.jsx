import logic from '../../logic/index.mjs'

import Heading from '../components/Heading'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from '../components/Link'
import Container from '../components/Container'

function Login() {

    const handleRegisterClick = event => {
        event.preventDefault()

        location.href = '../register'
    }

    const handleLoginSubmit = event => {
        event.preventDefault() //para que no se resetee la pagina

        const form = event.target //propiedad que permite acceder al elemento

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)

            location.href = '../home'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <main className="view">
        <Heading level="1">Login</Heading>

        <Form onSubmit={handleLoginSubmit} className="Form--column">
            <Container className="Container--column Container--column-left" >
                <Label htmFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="Container--column Container--column-left">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Button className="Button--form" type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </main>

}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Login />)