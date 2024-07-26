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
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new Error('target user not found'))

                        return
                    }

                    callback(null, targetUser.name)
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}