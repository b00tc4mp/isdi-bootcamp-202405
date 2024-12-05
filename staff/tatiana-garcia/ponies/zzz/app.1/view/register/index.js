(function () {

    var header = document.createElement('header')
    header.className = 'view header'
    document.body.appendChild(header)

    var title = document.createElement('title')
    title.className = 'view'
    header.appendChild(title)

    var main = document.createElement('main')
    main.className = 'view'
    document.body.appendChild(main)

    var form = document.createElement('form')
    form.className = 'form'
    main.appendChild(form)

    var divFormName = document.createElement('div')
    divFormName.className = 'form__field'
    form.appendChild(divFormName)


    var labelName = document.createElement('label')
    labelName.innerText = 'Name'
    labelName.htmlFor = 'name-input'
    divFormName.appendChild(labelName)

    var inputFormName = document.createElement('input')
    inputFormName.className = 'form__input'
    inputFormName.type = 'text'
    inputFormName.id = labelName.htmlFor
    inputFormName.name = 'name'
    inputFormName.placeholder = 'Name'
    divFormName.appendChild(inputFormName)

    var divFormSurname = document.createElement('div')
    divFormSurname.className = 'form__field'
    form.appendChild(divFormSurname)

    var labelSurname = document.createElement('label')
    labelSurname.innerText = 'Surname'
    labelSurname.htmlFor = 'surname-input'
    divFormSurname.appendChild(labelSurname)

    var inputFormSurname = document.createElement('input')
    inputFormSurname.className = 'form__input'
    inputFormSurname.type = 'text'
    inputFormSurname.id = labelSurname.htmlFor
    inputFormSurname.name = 'surname'
    inputFormSurname.placeholder = 'Surname'
    divFormSurname.appendChild(inputFormSurname)

    var divFormEmail = document.createElement('div')
    divFormEmail.className = 'form_field'
    form.appendChild(divFormEmail)


    var labelEmail = document.createElement('label')
    labelEmail.innerText = 'Email'
    labelEmail.htmlFor = 'email-input'
    divFormSurname.appendChild(labelEmail)

    var inputFormEmail = document.createElement('input')
    inputFormEmail.className = 'form__input'
    inputFormEmail.type = 'text'
    inputFormEmail.id = labelEmail.htmlFor
    inputFormEmail.name = 'email'
    inputFormEmail.placeholder = 'Email'
    divFormEmail.appendChild(inputFormEmail)


    var divFormUsername = document.createElement('div')
    divFormUsername.className = 'form__field'
    form.appendChild(divFormUsername)

    var labelUsername = document.createElement('label')
    labelUsername.innerText = 'Username'
    labelUsername.htmlFor = 'username-input'
    divFormUsername.appendChild(labelUsername)

    var inputFormUsername = document.createElement('input')
    inputFormUsername.className = 'form__input'
    inputFormUsername.type = 'text'
    inputFormUsername.id = labelUsername.htmlFor
    inputFormUsername.name = 'username'
    inputFormUsername.placeholder = 'Username'
    divFormUsername.appendChild(inputFormUsername)

    var divFormPassword = document.createElement('div')
    divFormPassword.className = 'form__field'
    form.appendChild(divFormPassword)

    var labelPassword = document.createElement('label')
    labelPassword.innerText = 'Password'
    labelPassword.htmlFor = 'password-input'
    divFormPassword.appendChild(labelPassword)

    var inputFormPassword = document.createElement('input')
    inputFormPassword.className = 'form__input'
    inputFormPassword.type = 'password'
    inputFormPassword.id = labelPassword.htmlFor
    inputFormPassword.name = 'password'
    inputFormPassword.placeholder = 'Password'
    divFormPassword.appendChild(inputFormPassword)

    var divFormPassword2 = document.createElement('div')
    divFormPassword2.className = 'form__field'
    form.appendChild(divFormPassword2)

    var labelPassword2 = document.createElement('label')
    labelPassword2.innerText = 'Repeat Password'
    labelPassword2.htmlFor = 'password2-input'
    divFormPassword2.appendChild(labelPassword2)

    var inputFormPassword2 = document.createElement('input')
    inputFormPassword2.className = 'form__input'
    inputFormPassword2.type = 'password'
    inputFormPassword2.id = labelPassword2.htmlFor
    inputFormPassword2.name = 'password2'
    inputFormPassword2.placeholder = 'Repeat Password'
    divFormPassword2.appendChild(inputFormPassword2)

    var registerButton = document.createElement('button')
    registerButton.className = 'form__button'
    registerButton.type = 'submit'
    registerButton.innerText = 'Register'
    form.appendChild(registerButton)

    form.onsubmit = function (event) {
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
    }

    var footer = document.createElement('footer')
    footer.className = 'footer'
    document.body.appendChild(footer)

    var loginButton = document.createElement('button')
    loginButton.className = 'login-button'
    loginButton.innerText = 'Login'
    footer.appendChild(loginButton)

    loginButton.onclick = function (event) {
        event.preventDefault()

        location.href = '../login'
    }
})()