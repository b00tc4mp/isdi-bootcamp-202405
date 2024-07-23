import data from '../data/index.js'

import validate from '../validate.js'

const updateAvatar = (username, newAvatar, callback) => {
    validate.username(username)
    validate.image(newAvatar, 'avatar')
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

        user.avatar = newAvatar

        data.updateUser(user => user.username === username, user, error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            callback(null)
        })
    })
}

export default updateAvatar