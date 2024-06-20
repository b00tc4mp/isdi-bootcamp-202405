(function () {
    const header = document.createElement('header')
    header.className = 'view header'
    document.body.appendChild(header)

    const title = document.createElement('h1')
    title.className = 'view'
    title.innerText = 'Login'
    header.appendChild(title)

    const main = document.createElement('main')
    main.className = 'view'
    document.body.appendChild(main)

    const form = document.createElement('form')
    form.className = 'form'
    main.appendChild(form)

    const divFormUsername = document.createElement('div')
    divFormUsername.className = 'form__field'
    form.appendChild(divFormUsername)

    const labelUsername = document.createElement('label')
    labelUsername.innerText = 'Username'
    labelUsername.htmlFor = 'username-input'
    divFormUsername.appendChild(labelUsername)

    const inputFormUsername = document.createElement('input')
    inputFormUsername.className = 'form__input'
    inputFormUsername.type = 'text'
    inputFormUsername.id = labelUsername.htmlFor
    inputFormUsername.name = 'username'
    inputFormUsername.placeholder = 'Username'
    divFormUsername.appendChild(inputFormUsername)

    const divFormPassword = document.createElement('div')
    divFormPassword.className = 'form__field'
    form.appendChild(divFormPassword)

    const labelPassword = document.createElement('label')
    labelPassword.innerText = 'Password'
    labelPassword.htmlFor = 'password-input'
    divFormPassword.appendChild(labelPassword)

    const inputFormPassword = document.createElement('input')
    inputFormPassword.className = 'form__input'
    inputFormPassword.type = 'password'
    inputFormPassword.id = labelPassword.htmlFor
    inputFormPassword.name = 'password'
    inputFormPassword.placeholder = 'Password'
    divFormPassword.appendChild(inputFormPassword)

    const loginButton = document.createElement('button')
    loginButton.className = 'form__button'
    loginButton.type = 'submit'
    loginButton.innerText = 'Login'
    form.appendChild(loginButton)

    form.onsubmit = function (event) {
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
    }

    const footer = document.createElement('footer')
    footer.className = 'footer'
    document.body.appendChild(footer)

    const registerButton = document.createElement('button')
    registerButton.className = 'register-button'
    registerButton.innerText = 'Register'
    footer.appendChild(registerButton)

    registerButton.onclick = function (event) {
        event.preventDefault()

        window.location.href = '../register'
    }
})()