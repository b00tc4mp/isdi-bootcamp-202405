(function () {
    var main = document.createElement('main')
    main.className = 'view'
    document.body.appendChild(main)

    var title = document.createElement('h1')
    title.className = 'view'
    title.innerText = 'Login'
    main.appendChild(title)

    var createLoginForm = document.createElement('form')
    createLoginForm.className = 'form'
    main.appendChild(createLoginForm)

    var usernameFieldDiv = document.createElement('div')
    usernameFieldDiv.className = 'form__field'
    createLoginForm.appendChild(usernameFieldDiv)

    var usernameLabel = document.createElement('label')
    usernameLabel.htmlFor = 'username-input'
    usernameLabel.innerText = "Username"
    usernameFieldDiv.appendChild(usernameLabel)

    var usernameInput = document.createElement('input')
    usernameInput.className = 'form__input'
    usernameInput.type = 'text'
    usernameInput.id = usernameLabel.htmlFor
    usernameInput.name = 'username'
    usernameInput.placeholder = 'username'
    usernameFieldDiv.appendChild(usernameInput)

    var passwordFieldDiv = document.createElement('div')
    passwordFieldDiv.className = 'form__field'
    createLoginForm.appendChild(passwordFieldDiv)

    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'Password'
    passwordLabel.htmlFor = 'password-input'
    passwordFieldDiv.appendChild(passwordLabel)

    var passwordInput = document.createElement('input')
    passwordInput.className = 'form__input'
    passwordInput.type = 'password'
    passwordInput.id = passwordLabel.htmlFor
    passwordInput.name = 'password'
    passwordInput.placeholder = 'password'
    passwordFieldDiv.appendChild(passwordInput)

    var loginButton = document.createElement('button')
    loginButton.className = 'form__button'
    loginButton.type = 'submit'
    loginButton.innerText = 'Login'
    createLoginForm.appendChild(loginButton)

    createLoginForm.onsubmit = function (event) {
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

    var footer = document.createElement('footer')
    footer.className = 'footer'
    document.body.appendChild(footer)

    var linkRegister = document.createElement('button')
    linkRegister.innerText = 'Register'
    footer.appendChild(linkRegister)

    linkRegister.onclick = function (event) {
        event.preventDefault()

        location.href = '../register'
    }
})()