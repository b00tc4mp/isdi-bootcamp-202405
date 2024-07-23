import data from '../data/index.js'

import validate from '../validate.js'

const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
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

        if (user.password !== password) {
            callback(new Error('Wrong password'))

            return
        }

        callback(null)
    })
}

export default authenticateUser