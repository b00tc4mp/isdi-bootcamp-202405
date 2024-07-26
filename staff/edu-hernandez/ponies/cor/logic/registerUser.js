import { validate } from 'com'
import { User } from '../data/models.js'

export default (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    User.findOne({ email })
        .then(user => {
            if (user) {
                callback(new Error('user already exists'))

                return
            }

            User.findOne({ username })
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
                        password
                    })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}