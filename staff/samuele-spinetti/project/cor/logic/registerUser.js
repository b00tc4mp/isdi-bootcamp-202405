import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { ValidationError, DuplicityError, SystemError } = errors

export default (name, surname, username, email, password, passwordRepeat) => {
    validate.name(name, 'name')
    validate.name(surname, 'surname')
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat)

    if (password !== passwordRepeat) throw new ValidationError('passwords do not match')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('email already exists')

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
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
                username,
                email,
                password: hash
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}