import data from '../data/index.js'

import validate from '../validate.js'

const getUser = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    const user = data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        })

    if (user === null)
        callback(new Error('user not found'))

    delete user.password

    return user
}

export default getUser