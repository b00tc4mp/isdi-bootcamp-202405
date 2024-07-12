import data from '../data/index.js'

import validate from '../validate.js'

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.surname(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    if (password !== passwordRepeat) throw new Error('Passwords do not match')

    let user = data.findUser(user => user.email === email)

    if (user !== null) throw new Error('Email already exists')

    user = data.findUser(user => user.username === username)

    if (user !== null) throw new Error('Username already exists')

    user = {
        name,
        surname,
        email,
        username,
        password,
        favs: [],
        following: [],
        avatar: 'https://svgsilh.com/svg/145535-707070.svg'
    }

    data.insertUser(user)
}

export default registerUser