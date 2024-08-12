import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, DuplicityError } = errors

export default (username, email, password, role) => {
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.string(role, 'role')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('email already in use')

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (user) throw new DuplicityError('username already in use')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                username,
                email,
                password: hash,
                role
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}