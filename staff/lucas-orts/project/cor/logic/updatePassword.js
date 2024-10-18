import { User } from '../data/models.js'
import bcrypt from 'bcryptjs'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, CredentialsError, SystemError, ValidationError } = errors

export default (userId, oldPassword, newPassword, newPasswordRepeat) => {
    validate.string(userId, 'userId')
    validate.password(oldPassword, 'oldPassword')
    validate.password(newPassword, 'newPassword')
    validate.password(newPasswordRepeat, 'newPasswordRepeat')

    if (newPassword !== newPasswordRepeat) throw new ValidationError('passwords do not match')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(oldPassword, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

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