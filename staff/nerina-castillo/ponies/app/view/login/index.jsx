import logic from '../../logic/index.mjs'

import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Label from '../components/Label'
import Form from '../components/Form'
import Heading from '../components/Heading'
import Container from '../components/Container'



function Login() {

    const handleRegisterClick = (event) => {
        event.preventDefault()

        location.href = '../register'
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        const form = event.target

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
        <Container className="header">Ponies</Container>

        <Heading level={1}>Login</Heading>

        <Form className={"Form"} onSubmit={handleLoginSubmit}>
            <div className="form__field">
                <Label htmlFor={"username-input"}>Username</Label>
                <Input type={"text"} id={"username-input"} name={"username"} placeholder={"username"} />
            </div>

            <div className="form__field">
                <Label htmlFor={"password-input"}>{"Password"}</Label>
                <Input type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
            </div>

            <Button className={"Button--section"} type={"submit"}>Login</Button>
        </Form>

        <Link href={""} onClick={handleRegisterClick} text={"Register"} />
    </main>

}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Login />)