import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name, surname, email, username, password) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then((user => {
            if (user)
                throw new DuplicityError('email already exists')

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        }))
        .then(user => {
            if (user)
                throw new DuplicityError('username already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                name,
                surname,
                email,
                username,
                password: hash
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}