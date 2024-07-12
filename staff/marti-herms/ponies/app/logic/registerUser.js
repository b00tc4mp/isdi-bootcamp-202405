import data from '../data'

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
    const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
    const USER_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
    //const PASSWORD_REGEX = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/
    const PASSWORD_REGEX = /^\w{8,}$/

    if (!NAME_REGEX.test(name.trim())) {
        throw new Error('invalid name')
    }
    if (!NAME_REGEX.test(surname.trim())) {
        throw new Error('ivalid surname')
    }
    if (!EMAIL_REGEX.test(email)) {
        throw new Error('invalid email')
    }
    if (!USER_REGEX.test(username)) {
        throw new Error('invalid username')
    }
    if (!PASSWORD_REGEX.test(password)) {
        throw new Error('invalid password')
    }
    if (password !== passwordRepeat) {
        throw new Error('passwords do not match')
    }

    let user = data.findUser(user => user.email === email)

    if (user !== null) {
        throw new Error('email already exists')
    }

    user = data.findUser(user => user.username === username)

    if (user !== null) {
        throw new Error('username already exists')
    }

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
        yourPosts: [],
        likedPosts: [],
        savedPosts: [],
        followers: [],
        following: [],
        avatar: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
    }

    data.insertUser(user)
}

export default registerUser