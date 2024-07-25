import data from '../data/index.js'

import { validate } from 'com'

export default (username, newAvatar, callback) => {
    validate.username(username)
    validate.string(newAvatar, 'avatar')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (user.avatar === newAvatar) {
                callback(new Error(error.message))

                return
            }

            data.users.updateOne({ username }, { $set: { avatar: newAvatar } })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}