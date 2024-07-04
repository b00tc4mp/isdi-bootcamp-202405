import logic from '../../logic/index.mjs'

const Component = React.Component

class Register extends Component {
    constructor() {
        super()
    }

    handleLoginClick(event) {
        event.preventDefault()// evita que la pagina se recargue y envie informacion

        location.href = '../login'
    }

    handleRegisterSubmit(event) {
        event.preventDefault()

        const form = event.target // llega al evento del dom, donde se provova el evento, en este caso DOM es submit. el evento es el formulario 
        // en html es el dom se usan las comillas dobles " "

        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        // cuando tenemos input que tienen id, es un input que tiene propiedad, como si fuera una propiedad del formulario

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        //coje el valor de cada input

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            location.href = '../login'

            alert('user successfully registered')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    // verifica si hay errores

    render() { // es pintar, espera que le devuelvas el DOM. la imagne. 
        //las clases son las del css
        return <main className="view">
            <h1>Register</h1>

            <form className="form" onSubmit={this.handleRegisterSubmit}>
                <div className="form__field">
                    <label htmlFor="name-input">Name</label>
                    <input className="form__input" type="text" id="name-input" name="name" placeholder="name" />
                </div>

                <div className="form__field">
                    <label htmlFor="surname-input">Surname</label>
                    <input className="form__input" type="text" id="surname-input" name="surname" placeholder="surname" />
                </div>

                <div className="form__field">
                    <label htmlFor="email-input">E-mail</label>
                    <input className="form__input" type="email" id="email-input" name="email" placeholder="email" />
                </div>

                <div className="form__field">
                    <label htmlFor="username-input">Username</label>
                    <input className="form__input" type="text" id="username-input" name="username" placeholder="username" />
                </div>

                <div className="form__field">
                    <label htmlFor="password-input">Password</label>
                    <input className="form__input" type="password" id="password-input" name="password" placeholder="password" />
                </div>

                <div className="form__field">
                    <label htmlFor="password-repeat-input">Repeat Password</label>
                    <input className="form__input" type="password" id="password-repeat-input" name="password-repeat" placeholder="repeat password" />
                </div>

                <button className="form__button" type="submit">Register</button>
            </form>

            <a href="" onClick={this.handleLoginClick}>Login</a>
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Register />)