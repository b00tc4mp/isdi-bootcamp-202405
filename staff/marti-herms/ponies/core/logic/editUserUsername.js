import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (oldUsername, newUsername, password, callback) => {
    validate.username(oldUsername, 'oldUsername')
    validate.username(newUsername, 'newUsername')
    validate.password(password)
    validate.callback(callback)

    User.findOne({ username: newUsername }).lean()
        .then(user => {
            if (user) {
                callback(new Error('username already exists'))

                return
            }

            User.findOne({ username: oldUsername }).lean()
                .then(user => {
                    if (!user) {
                        callback(new Error('user not found'))

                        return
                    }

                    if (password !== user.password) {
                        callback(new Error('wrong password'))

                        return
                    }

                    if (user.username !== newUsername) {
                        User.updateOne({ username: oldUsername }, { $set: { username: newUsername } })
                            .then(() => callback(null))
                            .catch(error => callback(new Error(error.message)))
                    } else callback(null)
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}
