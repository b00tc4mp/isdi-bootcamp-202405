import { User } from '../data/models.js'
import { validate } from '../../com/index.js'

export default (
    name,
    surname,
    email,
    username,
    password,
    passwordRepeat,
    callback
) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat)
    validate.callback(callback)


    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    User.findOne({ email }).lean()
        .then(user => {
            if (user) {
                callback(new Error('user already exists'))

                return
            }

            User.findOne({ username }).lean()
                .then(user => {
                    if (user) {
                        callback(new Error('user already exists'))

                        return
                    }

                    User.create({
                        name,
                        surname,
                        email,
                        username,
                        password,
                        favs: [],
                        following: [],
                        avatar: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
                    })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))

        })
        .catch(error => callback(new Error(error.message)))

}


