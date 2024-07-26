import { User } from '../data/models.js'

import { validate } from 'com'

export default (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))
            }

            User.find().lean()
                .then(users => {
                    const usernames = users.map(user => user.username)

                    callback(null, usernames)
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}