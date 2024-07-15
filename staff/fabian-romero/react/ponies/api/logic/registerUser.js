import data from '../data/index.js'
import validate from '..//validate.js'

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    let user = data.findUser(user => user.email === email)

    if (user !== null)
        throw new Error('email already exists')

    user = data.findUser(user => user.username === username)

    if (user !== null)
        throw new Error('username already exists')

    user = {
        name,
        surname,
        email,
        username,
        password,
        favs: [],
        following: [],
        avatar: "https://i.pinimg.com/564x/f6/21/64/f621641d5082d74385fabb5c2afb62f5.jpg"
    }

    data.insertUser(user)
}

export default registerUser