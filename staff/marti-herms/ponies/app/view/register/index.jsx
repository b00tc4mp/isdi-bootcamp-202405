import logic from '../../logic/index.mjs';

const { Component } = React;

class Register extends Component {
    constructor() {
        super();
    }

    handleRegisterSubmit(event) {
        event.preventDefault();

        const form = event.target;

        const nameInput = form['name-input'];
        const surnameInput = form['surname-input'];
        const emailInput = form['email-input'];
        const usernameInput = form['username-input'];
        const passwordInput = form['password-input'];
        const passwordRepeatInput = form['password2-input'];

        const name = nameInput.value;
        const surname = surnameInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat);

            alert('user succesfully registered');

            location.href = '../login';
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleLoginClicked(event) {
        event.preventDefault();

        location.href = '../login';
    }

    render() {
        return <main className='main'>
            <h1>Register</h1>

            <form className='form' onSubmit={this.handleRegisterSubmit}>
                <div className='form__field'>
                    <label htmlFor='name-input'>Name:</label>
                    <input id='name-input' className='form__input' type='text' name='name' placeholder='name' />
                </div>

                <div className='form__field'>
                    <label htmlFor='surname-input'>Surname:</label>
                    <input id='surname-input' className='form__input' type='text' name='surname' placeholder='surname' />
                </div>

                <div className='form__field'>
                    <label htmlFor='email-input'>Email:</label>
                    <input id='email-input' className='form__input' type='email' name='email' placeholder='email' />
                </div>

                <div className='form__field'>
                    <label htmlFor='username-input'>Username:</label>
                    <input id='username-input' className='form__input' type='text' name='username' placeholder='username' />
                </div>

                <div className='form__field'>
                    <label htmlFor='password-input'>Password:</label>
                    <input id='password-input' className='form__input' type='password' name='password' placeholder='password' />
                </div>

                <div className='form__field'>
                    <label htmlFor='password2-input'>Repeat Password:</label>
                    <input id='password2-input' className='form__input' type='password' name='password2' placeholder='repeat password' />
                </div>

                <button className='form__button' type='submit'>Register</button>
            </form>

            <a href='' onClick={this.handleLoginClicked}>Login</a>
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Register />); 