(function () {

    // documento cabecera va anclado al body, porque en html lo estaba creando, la cabecera, el titulo y el formulario
    var header = document.createElement('header')
    header.className = 'view header'
    document.body.appendChild(header)

    var title = document.createElement('h1')
    title.className = 'view'
    title.innerText = 'Login'
    header.appendChild(title)

    var main = document.createElement('main')
    main.className = 'view'
    document.body.appendChild(main)

    var form = document.createElement('form')
    form.className = 'form'
    main.appendChild(form)

    // creo un div (formulario) para agrupar todo con detalles

    var divFormUsername = document.createElement('div')
    divFormUsername.className = 'form__field'
    form.appendChild(divFormUsername)

    var labelUsername = document.createElement('label')
    labelUsername.innerText = 'Username'
    labelUsername.htmlfor = 'username-input'
    divFormUsername.appendChild(labelUsername)

    var inputFormUsername = document.createElement('input')
    inputFormUsername.className = 'form__input'
    inputFormUsername.type = 'text'
    inputFormUsername.id = labelUsername.htmlfor
    inputFormUsername.name = 'username'
    inputFormUsername.placeholder = 'Username'
    divFormUsername.appendChild(inputFormUsername)

    //div de possword

    var divFormPassword = document.createElement('div')
    divFormPassword.className = 'form__field'
    form.appendChild(divFormPassword)

    var labelPassword = document.createElement('label')
    labelPassword.innerText = 'Password'
    labelPassword.htmlfor = 'password-input'
    divFormPassword.appendChild(labelPassword)

    var inputFormPassword = document.createElement('input')
    inputFormPassword.className = 'form__input'
    inputFormPassword.type = 'password'
    inputFormPassword.id = labelPassword.htmlfor
    inputFormPassword.name = 'password'
    inputFormPassword.placeholder = 'password'
    divFormPassword.appendChild(inputFormPassword)

    var loginButton = document.createElement('button')
    loginButton.className = 'form__button'
    loginButton.type = 'submit'
    loginButton.innerText = 'Login'
    form.appendChild(loginButton)

    form.onsubmit = function (event) {
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

    var registerButton = document.createElement('button')
    registerButton.className = 'register-button'
    registerButton.innerText = 'Register'
    footer.appendChild(registerButton)

    registerButton.onclick = function (event) {
        event.preventDefault()

        location.href = '../register'
    }
})()