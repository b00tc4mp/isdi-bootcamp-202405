import data from '../data/index.js'

import validate from '../validate.js'

export default (username, oldPassword, newPassword, callback) => {
    validate.username(username)
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            if (oldPassword !== user.password) {
                callback(new Error('Invalid password'))

                return
            }

            data.users.updateOne({ username }, { $set: { password: newPassword } })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}