import { User } from '../data/models.js'
import { validate } from 'com'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new Error('TargetUser not found'))

                        return
                    }

                    const { following } = user

                    const index = following.indexOf(targetUsername)

                    if (index < 0)
                        following.push(targetUsername)
                    else
                        following.splice(index, 1)

                    User.updateOne({ username }, { $set: { following } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}