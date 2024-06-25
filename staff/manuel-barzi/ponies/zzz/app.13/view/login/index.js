(function () {
    var loginForm = new Form('form')

    loginForm.onSubmit(function (event) {
        event.preventDefault()

        var usernameInput = document.getElementById('username-input')
        var passwordInput = document.getElementById('password-input')

        var username = usernameInput.value
        var password = passwordInput.value

        try {
            loginUser(username, password)

            location.href = '../home'
        } catch (error) {
            alert(error.message)
        }
    })

    var registerLink = new Link('a')

    registerLink.onClick(function (event) {
        event.preventDefault()

        location.href = '../register'
    })
})()