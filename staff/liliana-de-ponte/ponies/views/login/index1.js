(function () {

    // var newObject = {
    //      form: 
    // }

    // Car {
    //       this.color = azul
    //       car.color = azul
    //       color: azul
    // }




    class Ponies {
        constructor(container) {
            this.container = container
        }

        add(child) {
            if (!(child instanceof Ponies))
                throw new TypeError('child is not a Component')

            this.container.appendChild(child.container)
        }

        setClassname(text) {
            if (typeof text !== 'string')
                throw new TypeError('text is not a string')

            this.container.className = text
        }

        setText(text) {
            if (typeof text !== 'string')
                throw new TypeError('text is not a string')

            this.container.innerText = text
        }

        setId(text) {
            if (typeof text !== 'string')
                throw new TypeError('text is not a string')

            this.container.id = text

        }

    }

    class Form extends Ponies {
        constructor() {
            super(document.createElement('form'))
        }
    }

    class Input extends Ponies {
        constructor() {
            super(document.createElement('input'))
        }
    }

    class Div extends Ponies {
        constructor() {
            super(document.createElement('div'))
        }
    }

    class H1 extends Ponies {
        constructor() {
            super(document.createElement('h1'))
        }
    }

    class Button extends Ponies {
        constructor() {
            super(document.createElement('button'))
        }
    }
    class Label extends Ponies {
        constructor() {
            super(document.createElement('label'))
        }
    }

    class Main extends Ponies {
        constructor() {
            super(document.createElement('main'))
        }
    }

    class Footer extends Ponies {
        constructor() {
            super(document.createElement('footer'))
        }
    }



    var main = new Main
    main.setClassname('view')
    document.body.appendChild(main)

    var title = new H1
    title.setClassname('view')
    title.setText('Login')
    main.setClassname('title')

    var createLoginForm = new Form
    createLoginForm.setClassname('form')
    main.add(createLoginForm)

    var usernameFieldDiv = new Div
    usernameFieldDiv.setClassname(form__field)
    createLoginForm.add(usernameFieldDiv)

    var usernameLabel = new Label
    usernameLabel.htmlFor = 'username-input'
    usernameLabel.setText("Username")
    usernameFieldDiv.add(usernameLabel)

    var usernameInput = new Input
    usernameInput.setClassname(form__input)
    usernameInput.type = 'text'
    usernameInput.id = usernameLabel.htmlFor
    usernameInput.name = 'username'
    usernameInput.placeholder = 'username'
    usernameFieldDiv.add(usernameInput)

    var passwordFieldDiv = new Div
    passwordFieldDiv.setClassname(form__field)
    createLoginForm.add(passwordFieldDiv)

    var passwordLabel = new Label
    passwordLabel.setText('Password')
    passwordLabel.htmlFor = 'password-input'
    passwordFieldDiv.add(passwordLabel)

    var passwordInput = new Input
    passwordInput.setClassname(form__input)
    passwordInput.type = 'password'
    passwordInput.id = passwordLabel.htmlFor
    passwordInput.name = 'password'
    passwordInput.placeholder = 'password'
    passwordFieldDiv.add(passwordInput)

    var loginButton = new Button
    loginButton.setClassname(form__button)
    loginButton.type = 'submit'
    loginButton.setText('Login')
    createLoginForm.add(loginButton)

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

    var footer = new Footer
    footer.setClassname('footer')
    document.body.add(footer)

    var linkRegister = new Button
    linkRegister = "register__button"
    linkRegister.setText('Register')
    footer.add(linkRegister)

    linkRegister.onclick = function (event) {
        event.preventDefault()

        location.href = '../register'
    }
})()