import { User } from '../data/models.js'
import bcrypt from 'bcryptjs'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, CredentialsError, SystemError } = errors

export default (userId, oldPassword, newPassword) => {
    validate.string(userId, 'UserId')
    validate.password(oldPassword)
    validate.password(newPassword)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return bcrypt.compare(oldPassword, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('Wrong password')

                    return bcrypt.hash(newPassword, 8)
                        .catch(error => { throw new Error(error.message) })
                        .then(hash => {
                            return User.updateOne({ _id: userId }, { $set: { password: hash } })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
        .then(() => { })
}