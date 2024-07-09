import logic from '../../logic/index.mjs'
import Heading from '../components/Heading'
import Container from '../components/Container'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from '../components/Link'

const { Component } = React

class Register extends Component {
    constructor() {
        super()
    }

    handleLoginClick(event) {
        event.preventDefault()

        location.href = '../login'
    }

    handleRegisterSubmit(event) {
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

            alert('user successfully registred')

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className="view">
            <Heading>Register</Heading>

            <Form onSubmit={this.handleRegisterSubmit} >
                <Container className={"form__field"}>
                    <Label htmlFor={"name-input"}>{'Name'}</Label>
                    <Input className={"form__input"} type={"text"} id={"name-input"} name={"name"} placeholder={"name"} />
                </Container>

                <Container className={"form__field"}>
                    <Label htmlFor={"surname-input"}>{'Surname'}</Label>
                    <Input className={"form__input"} type={"text"} id={"surname-input"} name={"surname"} placeholder={"surname"} />
                </Container>

                <Container className={"form__field"}>
                    <Label htmlFor={"email-input"}>{'Email'}</Label>
                    <Input className={"form__input"} type={"email"} id={"email-input"} name={"email"} placeholder={"email"} />
                </Container>

                <Container className={"form__field"}>
                    <Label htmlFor={"username-input"}>{'Username'}</Label>
                    <Input className={"form__input"} type={"text"} id={"username-input"} name={"username"} placeholder={"username"} />
                </Container>

                <Container className={"form__field"}>
                    <Label htmlFor={"password-input"}>{'Password'}</Label>
                    <Input className={"form__input"} type={"password"} name={"password"} id={"password-input"} placeholder={"password"} />
                </Container>

                <Container className={"form__field"}>
                    <Label htmlFor={"password2-input"}>{'Repeat password'}</Label>
                    <Input className={"form__input"} type={"password"} name={"password2"} id={"password2-input"} placeholder={"repeat password"} />
                </Container>

                <Button className={"form__button"} type={"submit"}>{'Register'}</Button>
            </Form>

            <Link onClick={this.handleLoginClick} text={'Login'} />
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)