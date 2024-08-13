{
    const loginForm = new Form('form')

    loginForm.onSubmit(function (event) {
        event.preventDefault()

        const usernameInput = document.getElementById('username-input')
        const passwordInput = document.getElementById('password-input')

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            loginUser(username, password)

            location.href = '../home'
        } catch (error) {
            alert(error.message)
        }
    })

    const registerLink = new Link('a')

    registerLink.onClick(function (event) {
        event.preventDefault()

        location.href = '../register'
    })
}