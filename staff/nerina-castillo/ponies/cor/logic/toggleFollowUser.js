import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new NotFoundError('targetUser not found'))

                        return
                    }

                    const { following } = user

                    const index = following.indexOf(targetUsername)

                    if (index < 0)
                        following.push(targetUsername)
                    else
                        following.splice(index, 1)

                    User.updateOne({ username }, { $set: { following } }).lean()
                        .then(() => callback(null))
                        .catch(error => callback(new SyntaxError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SyntaxError(error.message)))
}
