import logic from '../../logic/index.mjs'

import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Label from '../components/Label'
import Form from '../components/Form'
import Heading from '../components/Heading'

const Component = React.Component

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

            alert('user successfully registered')

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className="view">
            <div className="header">Ponies</div>

            <Heading level={1} text={"Register"} />

            <Form className={"form"} onSubmit={this.handleRegisterSubmit}>
                <div className="form__field">
                    <Label htmlFor={"name-input"} text={"Name"} />
                    <Input className={"form__input"} type={"text"} id={"name-input"} name={"name"} placeholder={"name"} />
                </div>

                <div className="form__field">
                    <Label htmlFor={"surname-input"} text={"Surname"} />
                    <Input className={"form__input"} type={"text"} id={"surname-input"} name={"surname"} placeholder={"surname"} />
                </div>

                <div className="form__field">
                    <Label htmlFor={"email-input"} text={"Email"} />
                    <Input className={"form__input"} type={"email"} id={"email-input"} name={"email"} placeholder={"email"} />
                </div>

                <div className="form__field">
                    <Label htmlFor={"username-input"} text={"Username"} />
                    <Input className={"form__input"} type={"text"} id={"username-input"} name={"username"} placeholder={"userame"} />
                </div>

                <div className="form__field">
                    <Label htmlFor={"password-input"} text={"Password"} />
                    <Input className={"form__input"} type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
                </div>

                <div className="form__field">
                    <Label htmlFor={"password2-input"} text={"Repeat Password"} />
                    <Input className={"form__input"} type={"password"} id={"password2-input"} name={"password2"}
                        placeholder="repeat password" />
                </div>

                <Button className={"form__button"} type={"submit"} text={"Register"} />
            </Form>

            <Link href={""} onClick={this.handleLoginClick} text={"Login"} />
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)