import data from '../data/index.js'
import validate from '../validate.js'

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
        avatar: 'https://www.shutterstock.com/shutterstock/photos/1284452899/display_1500/stock-vector-illustrator-of-unicorn-cartoon-pony-horse-cartoon-dream-pastel-color-happy-unicorn-expressions-1284452899.jpg'
    }

    data.insertUser(user)
}

export default registerUser