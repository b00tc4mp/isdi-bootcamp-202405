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

            bcrypt.compare(oldPassword, user.password)
                .then(match => {
                    if (!match) {
                        callback(new CredentialsError('Wrong password'))

                        return
                    }
                })
                .catch(error => callback(new SystemError(error.message)))

            bcrypt.hash(newPassword, 8)
                .then(hash => {
                    User.updateOne({ username }, { $set: { password: hash } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => done(error))
        })
        .catch(error => callback(new SystemError(error.message)))
}