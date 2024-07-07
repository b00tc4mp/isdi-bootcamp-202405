import logic from '../../logic/index.mjs'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from '../components/Link'
import Heading from '../components/Heading'

const Component = React.Component

class Login extends Component {
    constructor() {
        super()
    }

    handleRegisterClick(event) {
        event.preventDefault()

        location.href = '../register'
    }


    handleLoginSubmit(event) {
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

    render() {
        return <main className="view">
            <Heading level={1} text={'Login'} />

            <Form className={"form"} onSubmit={this.handleLoginSubmit}>
                <div className="form__field">
                    <Label htmFor={"username-input"} text={'Username'} />
                    <Input className={"form__input"} type={"text"} id={"username-input"} name={"username"} placeholder={"username"} />
                </div>

                <div className="form__field">
                    <Label htmlFor={"password-input"} text={"Password"} />
                    <Input className={"form__input"} type={"password"} id={"password-input"} name={"password"} placeholder={"password"} />
                </div>

                <Button className={"form__button"} type={"submit"} text={'Login'} />
            </Form>

            <Link href={""} onClick={this.handleRegisterClick} text={'Register'} />
        </main>

    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Login />)