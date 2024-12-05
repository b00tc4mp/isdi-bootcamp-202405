import bcrypt from 'bcryptjs'

import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { DuplicityError, NotFoundError, CredentialsError, SystemError } = errors

export default (userId, newUsername, password) => {
    validate.string(userId, 'userId')
    validate.username(newUsername, 'newUsername')
    validate.password(password)

    return User.findOne({ username: newUsername }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('username already in use')

            return User.findById(userId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(match => {
            if (!match)
                throw new CredentialsError('wrong password')

            return User.findByIdAndUpdate(userId, { username: newUsername })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
