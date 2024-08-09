{
    const registerForm = new Form('form')

    registerForm.onSubmit(function (event) {
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
            registerUser(name, surname, email, username, password, passwordRepeat)

            alert('user successfully registered')

            location.href = '../login'
        } catch (error) {
            alert(error.message)
        }
    })

    const loginLink = new Link('a')

    loginLink.onClick(function (event) {
        event.preventDefault()

        location.href = '../login'
    })
}