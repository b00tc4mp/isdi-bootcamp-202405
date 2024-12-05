function registerUser(name, surname, email, username, password, passwordRepeat) {
    if (!NAME_REGEX.test(name.trim())) {
        throw new Error('invalid name');
    }
    if (!NAME_REGEX.test(surname.trim())) {
        throw new Error('ivalid surname');
    }
    if (!EMAIL_REGEX.test(email)) {
        throw new Error('invalid email');
    }
    if (!USER_REGEX.test(username)) {
        throw new Error('invalid username');
    }
    if (!PASSWORD_REGEX.test(password)) {
        throw new Error('invalid password');
    }
    if (password !== passwordRepeat) {
        throw new Error('passwords do not match');
    }

    var users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    var user = users.find(function (user) {
        return user.email === email
    })

    if (user !== undefined) {
        throw new Error('email already exists');
    }

    var user = users.find(function (user) {
        return user.username === username
    })

    if (user !== undefined) {
        throw new Error('username already exists')
    }

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}