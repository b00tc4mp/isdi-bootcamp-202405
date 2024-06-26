{
    const home = new Component(document.body);

    const body = new Component(document.createElement('main'));
    body.setClassName('main');
    home.add(body);

    const login = new Paragraph('h1');
    login.setText('Register');
    body.add(login);

    const form = new Form('form');
    body.add(form);

    const nameDiv = new Field('form__field');
    form.add(nameDiv);

    const nameLabel = new Label('name-input');
    nameLabel.setText('Name');
    nameDiv.add(nameLabel);

    const nameInput = new Input(nameLabel.getFor());
    nameInput.setClassName('form__input');
    nameInput.setType('text');
    nameInput.setName('name');
    nameInput.setPlaceholder('name');
    nameDiv.add(nameInput);

    const surnameDiv = new Field('form__field');
    form.add(surnameDiv);

    const surnameLabel = new Label('surname-input');
    surnameLabel.setText('Surname');
    surnameDiv.add(surnameLabel);

    const surnameInput = new Input(surnameLabel.getFor());
    surnameInput.setClassName('form__input');
    surnameInput.setType('text');
    surnameInput.setName('surname');
    surnameInput.setPlaceholder('surname');
    surnameDiv.add(surnameInput);

    const emailDiv = new Field('form__field');
    form.add(emailDiv);

    const emailLabel = new Label('email-input');
    emailLabel.setText('Email');
    emailDiv.add(emailLabel);

    const emailInput = new Input(emailLabel.getFor());
    emailInput.setClassName('form__input');
    emailInput.setType('email');
    emailInput.setName('email');
    emailInput.setPlaceholder('email');
    emailDiv.add(emailInput);

    const usernameDiv = new Field('form__field');
    form.add(usernameDiv);

    const usernameLabel = new Label('username-input');
    usernameLabel.setText('Username');
    usernameDiv.add(usernameLabel);

    const usernameInput = new Input(usernameLabel.getFor());
    usernameInput.setClassName('form__input');
    usernameInput.setType('text');
    usernameInput.setName('username');
    usernameInput.setPlaceholder('username');
    usernameDiv.add(usernameInput);

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

    const passwordRepeatDiv = new Field('form__field');
    form.add(passwordRepeatDiv);

    const passwordRepeatLabel = new Label('password2-input');
    passwordRepeatLabel.setText('Repeat Password');
    passwordRepeatDiv.add(passwordRepeatLabel);

    const passwordRepeatInput = new Input(passwordRepeatLabel.getFor());
    passwordRepeatInput.setClassName('form__input');
    passwordRepeatInput.setType('password');
    passwordRepeatInput.setName('password2');
    passwordRepeatInput.setPlaceholder('repeat password');
    passwordRepeatDiv.add(passwordRepeatInput);

    const submitButton = new Button('form__button');
    submitButton.setType('submit');
    submitButton.setText('Register')
    form.add(submitButton);



    form.onSubmit((event) => {
        event.preventDefault()

        const name = nameInput.getValue();
        const surname = surnameInput.getValue();
        const email = emailInput.getValue();
        const username = usernameInput.getValue();
        const password = passwordInput.getValue();
        const passwordRepeat = passwordRepeatInput.getValue();

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat);

            alert('user succesfully registered');

            location.href = '../login';
        } catch (error) {
            alert(error.message);
        }
    });

    const link = new Link('Login');
    body.add(link);

    link.onClick((event) => {
        event.preventDefault();

        location.href = '../login';
    });
};