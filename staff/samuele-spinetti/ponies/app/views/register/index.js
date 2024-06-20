(function () {
    const header = document.createElement('header')
    header.className = 'view header'
    document.body.appendChild(header)

    const title = document.createElement('h1')
    title.className = 'view'
    title.innerText = 'Register'
    header.appendChild(title)

    const main = document.createElement('main')
    main.className = 'view'
    document.body.appendChild(main)

    const form = document.createElement('form')
    form.className = 'form'
    main.appendChild(form)

    const divFormName = document.createElement('div')
    divFormName.className = 'form__field'
    form.appendChild(divFormName)

    const labelName = document.createElement('label')
    labelName.innerText = 'Name'
    labelName.htmlFor = 'name-input'
    divFormName.appendChild(labelName)

    const inputFormName = document.createElement('input')
    inputFormName.className = 'form__input'
    inputFormName.type = 'text'
    inputFormName.id = labelName.htmlFor
    inputFormName.name = 'name'
    inputFormName.placeholder = 'Name'
    divFormName.appendChild(inputFormName)

    const divFormSurname = document.createElement('div')
    divFormSurname.className = 'form__field'
    form.appendChild(divFormSurname)

    const labelSurname = document.createElement('label')
    labelSurname.innerText = 'Surname'
    labelSurname.htmlFor = 'surname-input'
    divFormSurname.appendChild(labelSurname)

    const inputFormSurname = document.createElement('input')
    inputFormSurname.className = 'form__input'
    inputFormSurname.type = 'text'
    inputFormSurname.id = labelSurname.htmlFor
    inputFormSurname.name = 'surname'
    inputFormSurname.placeholder = 'Surname'
    divFormSurname.appendChild(inputFormSurname)

    const divFormEmail = document.createElement('div')
    divFormEmail.className = 'form__field'
    form.appendChild(divFormEmail)

    const labelEmail = document.createElement('label')
    labelEmail.innerText = 'Email'
    labelEmail.htmlFor = 'email-input'
    divFormSurname.appendChild(labelEmail)

    const inputFormEmail = document.createElement('input')
    inputFormEmail.className = 'form__input'
    inputFormEmail.type = 'text'
    inputFormEmail.id = labelEmail.htmlFor
    inputFormEmail.name = 'email'
    inputFormEmail.placeholder = 'Email'
    divFormEmail.appendChild(inputFormEmail)

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

    const divFormPassword2 = document.createElement('div')
    divFormPassword2.className = 'form__field'
    form.appendChild(divFormPassword2)

    const labelPassword2 = document.createElement('label')
    labelPassword2.innerText = 'Repeat Password'
    labelPassword2.htmlFor = 'password2-input'
    divFormPassword2.appendChild(labelPassword2)

    const inputFormPassword2 = document.createElement('input')
    inputFormPassword2.className = 'form__input'
    inputFormPassword2.type = 'password'
    inputFormPassword2.id = labelPassword2.htmlFor
    inputFormPassword2.name = 'password2'
    inputFormPassword2.placeholder = 'Repeat Password'
    divFormPassword2.appendChild(inputFormPassword2)

    const registerButton = document.createElement('button')
    registerButton.className = 'form__button'
    registerButton.type = 'submit'
    registerButton.innerText = 'Register'
    form.appendChild(registerButton)

    form.onsubmit = function (event) {
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
    }

    const footer = document.createElement('footer')
    footer.className = 'footer'
    document.body.appendChild(footer)

    const loginButton = document.createElement('button')
    loginButton.className = 'login-button'
    loginButton.innerText = 'Login'
    footer.appendChild(loginButton)

    loginButton.onclick = function (event) {
        event.preventDefault()

        location.href = '../login'
    }
})()