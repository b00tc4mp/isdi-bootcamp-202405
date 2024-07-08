import logic from '../../logic/index.mjs'

import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Label from '../components/Label'
import Form from '../components/Form'
import Heading from '../components/Heading'
import Container from '../components/Container'

function Register() {

    const handleLoginClick = (event) => {
        event.preventDefault()

        location.href = '../login'
    }

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
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            alert('user successfully registered')

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    return <main className="view">
        <Container className="header">Ponies</Container>

        <Heading level={1}>{"Register"} </Heading>

        <Form className={"Form"} onSubmit={handleRegisterSubmit}>
            <div className="form__field">
                <Label htmlFor={"name-input"}>{"Name"}</Label>
                <Input type={"text"} id={"name-input"} name={"name"} placeholder={"name"} />
            </div>

            <div className="form__field">
                <Label htmlFor={"surname-input"}>{"Surname"}</Label>
                <Input type={"text"} id={"surname-input"} name={"surname"} placeholder={"surname"} />
            </div>

            <div className="form__field">
                <Label htmlFor={"email-input"}>{"Email"}</Label>
                <Input type={"email"} id={"email-input"} name={"email"} placeholder={"email"} />
            </div>

            <div className="form__field">
                <Label htmlFor={"username-input"}>{"Username"}</Label>
                <Input type={"text"} id={"username-input"} name={"username"} placeholder={"userame"} />
            </div>

            <div className="form__field">
                <Label htmlFor={"password-input"} >{"Password"}</Label>
                <Input type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
            </div>

            <div className="form__field">
                <Label htmlFor={"password2-input"} >{"Repeat Password"}</Label>
                <Input type={"password"} id={"password2-input"} name={"password2"}
                    placeholder="repeat password" />
            </div>

            <Button className={"Button--section"} type={"submit"} >{"Register"} </Button>
        </Form>

        <Link href={""} onClick={handleLoginClick} text={"Login"} />
    </main>

}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)