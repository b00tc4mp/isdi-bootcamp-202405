import data from '../data/index.js'

import validate from '../validate.js'

const getUser = (username, targetUsername, callback) => {
    validate.username(username)
    validate.targetUsername(targetUsername)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUser) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (!targetUser) {
                callback(new Error('target user not found'))

                return
            }

            delete targetUser.password

            callback(null, targetUser)
        })
    })
}

export default getUser