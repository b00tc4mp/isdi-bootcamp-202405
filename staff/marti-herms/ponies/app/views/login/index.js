(() => {
    const body = new Component(document.body);

    const main = new Main('view');
    body.add(main);

    const login = new Text('h1');
    login.setInnerText('Login');
    main.add(login);

    const form = new Form('form');
    main.add(form);

    const userDiv = new Divider('form__field');
    form.add(userDiv);

    const userLabel = new Label('username-input');
    userLabel.setInnerText('Username');
    userDiv.add(userLabel);

    const usernameInput = new Input(userLabel.getFor());
    usernameInput.setClassName('form__input');
    usernameInput.setType('text');
    usernameInput.setName('username');
    usernameInput.setPlaceholder('username');
    userDiv.add(usernameInput);

    const passwordDiv = new Divider('form__field');
    form.add(passwordDiv);

    const passwordLabel = new Label('password-input');
    passwordLabel.setInnerText('Password');
    passwordDiv.add(passwordLabel);

    const passwordInput = new Input(passwordLabel.getFor());
    passwordInput.setClassName('form__input');
    passwordInput.setType('password');
    passwordInput.setName('password');
    passwordInput.setPlaceholder('password');
    passwordDiv.add(passwordInput);

    const submitButton = new Button('form__button');
    submitButton.setType('submit');
    submitButton.setInnerText('Login')
    form.add(submitButton);

    form.container.onsubmit = (event) => {
        event.preventDefault();

        const username = usernameInput.getValue();
        const password = passwordInput.getValue();

        try {
            loginUser(username, password);

            location.href = '../home';
        } catch (error) {
            alert(error.message);
        }
    }

    const a = document.createElement('a');
    a.href = '';
    a.innerText = 'Register'
    main.container.appendChild(a);

    a.onclick = (event) => {
        event.preventDefault();

        location.href = '../register';
    }
})();