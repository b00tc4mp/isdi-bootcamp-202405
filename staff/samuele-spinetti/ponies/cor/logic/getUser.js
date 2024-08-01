import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { SystemError, NotFoundError } = errors

export default (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.findOne({ username: targetUsername }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError('Target user not found')

            delete targetUser.password

            return targetUser
        })
}