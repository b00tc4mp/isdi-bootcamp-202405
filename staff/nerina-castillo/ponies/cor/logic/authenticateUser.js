import { User } from '../data/models.js'
import bcrypt from 'bcryptjs'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, CredentialsError, SystemError } = errors

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        callback(new CredentialsError('wrong password'))

                        return
                    }

                    callback(null)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}