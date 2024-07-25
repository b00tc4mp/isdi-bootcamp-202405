import data from '../data/index.js'

import validate from '../validate.js'

export default (username, newAvatar, callback) => {
    validate.username(username)
    validate.image(newAvatar, 'avatar')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            data.users.updateOne({ username }, { $set: { avatar: newAvatar } })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))

        })
        .catch(error => callback(new Error(error.message)))
}