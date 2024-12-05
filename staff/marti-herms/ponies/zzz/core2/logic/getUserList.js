import data from '../data/index.js'

import validate from '../validate.js'

const getUserList = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('user not found'))
        }

        if (user === null) {
            callback(new Error('user not found'))
        }

        data.findUsers(() => true, (error, users) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            const usernames = users.map(user => user.username)

            callback(null, usernames)
        })

    })
}

export default getUserList