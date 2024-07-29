import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { CredentialsError, NotFoundError, SystemError } = errors

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'))

                return
            }

            if (user.password !== password) {
                callback(new CredentialsError('Wrong password'))

                return
            }

            callback(null)
        })
        .catch(error => callback(new SystemError(error.message)))
}