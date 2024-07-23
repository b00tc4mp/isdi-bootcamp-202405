import data from '../data/index.js'

import validate from '../validate.js'

const editUserAvatar = (username, newAvatar, callback) => {
    validate.username(username)
    validate.string(newAvatar, 'avatar')
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user.avatar === avatar) return

        user.avatar = avatar

        data.updateUser(user => user.username === username, user, (error) => {
            if (error) {
                callback(new Error(error.message))

                return
            }
            callback(null)
        })
    })
}

export default editUserAvatar