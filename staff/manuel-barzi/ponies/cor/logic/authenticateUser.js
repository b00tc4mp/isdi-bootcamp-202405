import data from '../data/index.js'

import validate from '../validate.js'

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            if (user.password !== password) {
                callback(new Error('wrong password'))

                return
            }

            callback(null)
        })
        .catch(error => callback(new Error(error.message)))
}