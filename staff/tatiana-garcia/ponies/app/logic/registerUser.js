import data from '../data'
import validate from '../validate'

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name, 'name')
    validate.surname(surname, 'surname')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    if (passwordRepeat !== password) throw new SyntaxError('passwords do not match')

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
        favs: [],
        following: [],
        avatar: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
    }

    data.insertUser(user)
}

export default registerUser