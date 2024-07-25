import data from '../data/index.js'

import { validate } from 'com'

export default (name, surname, email, username, password, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    data.users.findOne({ email })
        .then((user => {
            if (user) {
                callback(new Error('email already exists'))

                return
            }

            data.users.findOne({ username })
                .then(user => {
                    if (user) {
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

                    data.users.insertOne(user)
                        .then(() => callback(null))
                        .catch(error => new Error(error.message))
                })
                .catch(error => new Error(error.message))
        }))
        .catch(error => new Error(error.message))
}