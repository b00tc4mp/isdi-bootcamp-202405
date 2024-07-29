import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundUser, SystemError } = errors

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundUser('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(user => {
                    if (!user) {
                        callback(new NotFoundUser('target user not found'))

                        return
                    }

                    callback(null, user.name)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}