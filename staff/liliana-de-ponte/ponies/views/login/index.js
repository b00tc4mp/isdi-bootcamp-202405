(function () {
    var loginForm = new Form('form')

    loginForm.onSubmit(event => {
        event.preventDefault()

        var usernameInput = document.getElementById('username-input')
        var passwordInput = document.getElementById('password-input')

        var username = usernameInput.value
        var password = passwordInput.value

        try {
            logic.loginUser(username, password)

            location.href = '../home'
        } catch (error) {
            alert(error.message)
        }
    })

    var registerLink = new Link('a')

    registerLink.onClick(event => {
        event.preventDefault()

        location.href = '../register'
    })
})()