import bcrypt from 'bcryptjs'

import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { DuplicityError, NotFoundError, CredentialsError, SystemError } = errors

export default (oldUsername, newUsername, password) => {
    validate.username(oldUsername, 'oldUsername')
    validate.username(newUsername, 'newUsername')
    validate.password(password)

    return User.findOne({ username: newUsername }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('username already in use')

            return User.findOne({ username: oldUsername }).lean()
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

            return User.updateOne({ username: oldUsername }, { $set: { username: newUsername } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
