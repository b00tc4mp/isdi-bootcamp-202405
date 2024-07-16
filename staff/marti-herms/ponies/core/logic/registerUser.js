import data from '../data/index.js'

import validate from '../validate.js'

const registerUser = (name, surname, email, username, password/*, passwordRepeat*/) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    // if (password !== passwordRepeat) {
    //     throw new Error('passwords do not match')
    // }

    let user = data.findUser(user => user.email === email)

    if (user !== null) {
        throw new Error('email already exists')
    }

    user = data.findUser(user => user.username === username)

    if (user !== null) {
        throw new Error('username already exists')
    }

    user = {
        name,
        surname,
        email,
        username,
        password,
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