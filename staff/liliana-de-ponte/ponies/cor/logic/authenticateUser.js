import { User } from '../data/models.js'

import { validate } from 'com'

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    User.findOne({ username }).lean()
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

