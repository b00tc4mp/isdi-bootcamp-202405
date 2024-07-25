import data from '../data/index.js'

import validate from '../validate.js'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            data.users.findOne({ username: targetUsername })
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new Error('Target user not found'))

                        return
                    }

                    callback(null, targetUser.name)

                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}