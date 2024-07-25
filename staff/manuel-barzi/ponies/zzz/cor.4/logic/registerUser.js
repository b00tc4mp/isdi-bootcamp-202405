import data from '../data/index.js'
import { validate } from 'com'

export default (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    data.users.findOne({ email })
        .then(user => {
            if (user) {
                callback(new Error('user already exists'))

                return
            }

            data.users.findOne({ username })
                .then(user => {
                    if (user) {
                        callback(new Error('user already exists'))

                        return
                    }

                    const newUser = {
                        name,
                        surname,
                        email,
                        username,
                        password,
                        favs: [],
                        following: [],
                        avatar: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
                    }

                    data.users.insertOne(newUser)
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}