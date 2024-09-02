import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('targetUser not found')
                    targetUser.id = targetUser._id.toString()
                    delete targetUser._id
                    delete targetUser.password

                    return targetUser
                })
        })
}