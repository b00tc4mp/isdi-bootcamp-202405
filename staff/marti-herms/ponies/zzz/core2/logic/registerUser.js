import data from '../data/index.js'

import validate from '../validate.js'

const registerUser = (name, surname, email, username, password, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    data.findUser(user => user.email === email, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user !== null) {
            callback(new Error('email already exists'))

            return
        }

        data.findUser(user => user.username === username, (error, user) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (user !== null) {
                callback(new Error('username already exists'))

                return
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

            data.insertUser(user, (error) => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

export default registerUser