import data from '../data/index.js'

import validate from '../validate.js'

const getUserList = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (user === null) {
                callback(new Error('user not found'))
            }

            if (user === null) {
                callback(new Error('user not found'))
            }

            data.users.find().toArray()
                .then(users => {
                    const usernames = users.map(user => user.username)

                    callback(null, usernames)
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}

export default getUserList