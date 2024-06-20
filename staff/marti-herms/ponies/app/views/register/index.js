(() => {
    const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
    const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
    const USER_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
    //const PASSWORD_REGEX = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/
    const PASSWORD_REGEX = /^\w{8,}$/;
    const form = document.querySelector('form')

    form.onsubmit = (event) => {
        event.preventDefault()

        const nameInput = document.getElementById('name-input')
        const surnameInput = document.getElementById('surname-input')
        const emailInput = document.getElementById('email-input')
        const usernameInput = document.getElementById('username-input')
        const passwordInput = document.getElementById('password-input')
        const passwordRepeatInput = document.getElementById('password2-input')

        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value

        try {
            registerUser(name, surname, email, username, password, passwordRepeat);

            alert('user succesfully registered');

            location.href = '../login';
        } catch (error) {
            alert(error.message);
        }
    }

    const a = document.querySelector('a')

    a.onclick = (event) => {
        event.preventDefault()

        location.href = '../login'
    }
})();