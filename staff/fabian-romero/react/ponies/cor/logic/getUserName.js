import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

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

            User.findOne({ username }).lean()
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new SystemError('target user not found'))

                        return
                    }

                    callback(null, targetUser.name)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}