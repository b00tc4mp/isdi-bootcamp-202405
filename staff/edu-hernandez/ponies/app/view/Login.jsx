import logic from '../logic/index.mjs'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)

            onLogin()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    // return <main className="view">
    //     <Container className='Container--column'>
    //         <Heading className="Heading--center" level="1">Login</Heading>
    //     </Container>

    //     <Form className="Form Form--column" onSubmit={handleLoginSubmit}>
    //         <Container className="Container--column">
    //             <Label htmlFor="username-input">Username</Label>
    //             <Input type="text" id="username-input" name="username" placeholder="username" />
    //         </Container>

    //         <Container className="Container--column">
    //             <Label htmlFor="password-input">Password</Label>
    //             <Input type="password" id="password-input" name="password" placeholder="password" />
    //         </Container>

    //         <Button type="submit">Login</Button>
    //     </Form>

    //     <Link onClick={handleRegisterClick}>Register</Link>
    // </main>

}

export default Login