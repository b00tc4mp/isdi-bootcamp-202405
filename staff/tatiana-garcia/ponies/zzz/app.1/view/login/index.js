(function () {

    const body = new Component(document.body) // aqui el dociment.body(<body>) es el argumento que recibe la clase component que es el container. 
    //----------HEADER---------------
    const header = new Header
    body.add(header)

    const title = new TitleLogin
    header.add(title)
    //-----------------------------------------------------------
    const main = new Main('view')
    body.add(main)

    const form = new Form
    main.add(form)

    const divFormUsername = new FormFieldDiv
    form.add(divFormUsername)

    const labelUsername = document.createElement('label')
    labelUsername.innerText = 'username'
    labelUsername.htmlFor = 'username-input'
    divFormUsername.container.appendChild(labelUsername)

    const inputFormUsername = document.createElement('input')
    inputFormUsername.className = 'form__input'
    inputFormUsername.type = 'text'
    inputFormUsername.id = labelUsername.htmlFor
    inputFormUsername.name = 'username'
    inputFormUsername.placeholder = 'Username'
    divFormUsername.container.appendChild(inputFormUsername)

    const divFormPassword = new FormFieldDiv
    form.add(divFormPassword)

    const labelPassword = document.createElement('label')
    labelPassword.innerText = 'Password'
    labelPassword.htmlFor = 'password-input'
    divFormPassword.container.appendChild(labelPassword)

    const inputFormPassword = document.createElement('input')
    inputFormPassword.className = 'form__input'
    inputFormPassword.type = 'password'
    inputFormPassword.id = labelPassword.htmlFor
    inputFormPassword.name = 'password'
    inputFormPassword.placeholder = 'Password'
    divFormPassword.container.appendChild(inputFormPassword)

    const loginButton = document.createElement('button')
    loginButton.className = 'form__button'
    loginButton.type = 'submit'
    loginButton.innerText = 'login'
    form.container.appendChild(loginButton)

    form.onSubmit(function (event) {

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

    const footer = new Footer
    body.add(footer)

    const registerButton = new RegisterButton
    footer.add(registerButton)

    registerButton.onClick(function (event) {

        event.preventDefault()

        location.href = '../register'
    })

})()

