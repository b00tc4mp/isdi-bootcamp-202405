import { User } from '../data/models.js'

import { validate } from 'com'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(user => {
                    if (!user) {
                        callback(new Error('target user not found'))

                        return
                    }

                    user.id = user._id.toString()

                    delete user._id

                    delete user.password

                    callback(null, user)
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}