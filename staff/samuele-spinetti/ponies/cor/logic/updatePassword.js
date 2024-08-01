import { User } from '../data/models.js'
import bcrypt from 'bcryptjs'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, CredentialsError, SystemError } = errors

export default (username, oldPassword, newPassword) => {
    validate.username(username)
    validate.password(oldPassword)
    validate.password(newPassword)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            bcrypt.compare(oldPassword, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('Wrong password')
                })

            bcrypt.hash(newPassword, 8)
                .catch(error => { throw new Error(error.message) })
                .then(hash => {
                    User.updateOne({ username }, { $set: { password: hash } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}