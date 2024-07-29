import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { ValidationError, DuplicityError, SystemError } = errors

export default (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.callback(callback)

    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')

    User.findOne({ email }).lean()
        .then(user => {
            if (user) {
                callback(new DuplicityError('user already exists'))

                return
            }

            User.findOne({ username }).lean()
                .then(user => {
                    if (user) {
                        callback(new DuplicityError('user already exists'))

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
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}