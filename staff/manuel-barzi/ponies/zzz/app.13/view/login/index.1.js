(function () {
    var form = new Component(document.querySelector('form'))

    form.container.onsubmit = function (event) {
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
    }

    var a = document.querySelector('a')

    a.onclick = function (event) {
        event.preventDefault()

        location.href = '../register'
    }
})()