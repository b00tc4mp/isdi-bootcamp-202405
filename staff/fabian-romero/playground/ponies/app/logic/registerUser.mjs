import data from '../data/index.mjs'

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    if (name.trim() === '')
        throw new Error('invalid name')

    if (surname.trim().length < 2)
        throw new Error('invalid surname')

    if (!EMAIL_REGEX.test(email))
        throw new Error('invalid email')

    if (username.trim().length < 4)
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    let user = data.findUser(user => user.email === email)

    if (user !== null)
        throw new Error('email already exists')

    user = data.findUser(user => user.username === username)

    if (user !== null)
        throw new Error('username already exists')

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
        favs: []
    }

    data.insertUser(user)
}

export default registerUser