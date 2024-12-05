(function () {
    var registerForm = new Form('form')

    registerForm.onSubmit(function (event) {
        event.preventDefault()

        var nameInput = document.getElementById('name-input')
        var surnameInput = document.getElementById('surname-input')
        var emailInput = document.getElementById('email-input')
        var usernameInput = document.getElementById('username-input')
        var passwordInput = document.getElementById('password-input')
        var passwordRepeatInput = document.getElementById('password2-input')

        var name = nameInput.value
        var surname = surnameInput.value
        var email = emailInput.value
        var username = usernameInput.value
        var password = passwordInput.value
        var passwordRepeat = passwordRepeatInput.value

        try {
            registerUser(name, surname, email, username, password, passwordRepeat)

            alert('user successfully registered')

            location.href = '../login'
        } catch (error) {
            alert(error.message)
        }
    })

    var loginLink = new Link('a')

    loginLink.onClick(function (event) {
        event.preventDefault()

        location.href = '../login'
    })
})()