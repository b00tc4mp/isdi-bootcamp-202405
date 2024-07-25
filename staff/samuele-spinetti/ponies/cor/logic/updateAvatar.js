import { User } from '../data/models.js'
import { validate } from 'com'

export default (username, newAvatar, callback) => {
    validate.username(username)
    validate.image(newAvatar, 'avatar')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            User.updateOne({ username }, { $set: { avatar: newAvatar } })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))

        })
        .catch(error => callback(new Error(error.message)))
}