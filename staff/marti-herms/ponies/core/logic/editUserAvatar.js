import { User } from '../data/models.js'

import { validate } from 'com'

export default (username, newAvatar, callback) => {
    validate.username(username)
    validate.string(newAvatar, 'avatar')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (user.avatar === newAvatar) {
                callback(new Error('same avatar'))

                return
            }

            User.updateOne({ username }, { $set: { avatar: newAvatar } })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}