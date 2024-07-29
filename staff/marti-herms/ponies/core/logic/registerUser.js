import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name, surname, email, username, password, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    User.findOne({ email }).lean()
        .then((user => {
            if (user) {
                callback(new DuplicityError('email already exists'))

                return
            }

            User.findOne({ username }).lean()
                .then(user => {
                    if (user) {
                        callback(new DuplicityError('username already exists'))

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
        }))
        .catch(error => callback(new SystemError(error.message)))
}