import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new NotFoundError('target user not found'))

                        return
                    }
                    delete targetUser.password

                    callback(null, targetUser)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}