import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.string(userId, 'userId')
    validate.string(targetUserId, 'targetUserId')

    return User.findById(targetUserId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError('Target user not found')

            const { likes } = targetUser

            const index = likes.findIndex(likeId => likeId.toString() === userId)

            if (index >= 0) {
                likes.splice(index, 1)

                return User.updateOne({ _id: targetUserId }, { $set: { likes } })
            }

            return Promise.resolve()
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(() => { })
}