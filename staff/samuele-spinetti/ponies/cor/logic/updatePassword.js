import data from '../data/index.js'

import validate from '../validate.js'

const updatePassword = (username, oldPassword, newPassword, callback) => {
    validate.username(username)
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('User not found'))

            return
        }

        if (oldPassword !== user.password) {
            callback(new Error('Invalid password'))

            return
        }

        user.password = newPassword

        data.updateUser(user => user.username === username, user, error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            callback(null)
        })
    })
}

export default updatePassword