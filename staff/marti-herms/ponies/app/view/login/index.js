{
    const home = new Component(document.body);

    const body = new Component(document.createElement('main'));
    body.setClassName('view');
    home.add(body);

    const login = new Paragraph('h1');
    login.setText('Login');
    body.add(login);

    const form = new Form('form');
    body.add(form);

    const userDiv = new Field('form__field');
    form.add(userDiv);

    const userLabel = new Label('username-input');
    userLabel.setText('Username');
    userDiv.add(userLabel);

    const usernameInput = new Input(userLabel.getFor());
    usernameInput.setClassName('form__input');
    usernameInput.setType('text');
    usernameInput.setName('username');
    usernameInput.setPlaceholder('username');
    userDiv.add(usernameInput);

    const passwordDiv = new Field('form__field');
    form.add(passwordDiv);

    const passwordLabel = new Label('password-input');
    passwordLabel.setText('Password');
    passwordDiv.add(passwordLabel);

    const passwordInput = new Input(passwordLabel.getFor());
    passwordInput.setClassName('form__input');
    passwordInput.setType('password');
    passwordInput.setName('password');
    passwordInput.setPlaceholder('password');
    passwordDiv.add(passwordInput);

    const submitButton = new Button('form__button');
    submitButton.setType('submit');
    submitButton.setText('Login')
    form.add(submitButton);

    form.onSubmit((event) => {
        event.preventDefault();

        const username = usernameInput.getValue();
        const password = passwordInput.getValue();

        try {
            logic.loginUser(username, password);

            location.href = '../home';
        } catch (error) {
            alert(error.message);
        }
    });

    const link = new Link('Register');
    body.add(link);

    link.onClick((event) => {
        event.preventDefault();

        location.href = '../register';
    });
};