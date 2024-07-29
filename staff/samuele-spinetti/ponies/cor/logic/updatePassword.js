import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, CredentialsError, SystemError } = errors

export default (username, oldPassword, newPassword, callback) => {
    validate.username(username)
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'))

                return
            }

            if (oldPassword !== user.password) {
                callback(new CredentialsError('Invalid password'))

                return
            }

            User.updateOne({ username }, { $set: { password: newPassword } })
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}