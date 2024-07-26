import 'dotenv/config.js'
import { validate } from 'com'
import { User } from '../data/models.js'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            User.findOne({ username: targetUsername })
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new Error('targetUser not found'))

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