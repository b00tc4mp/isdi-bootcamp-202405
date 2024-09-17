import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('Target user not found')

                    const { likes } = user

                    const index = likes.findIndex(likeId => likeId.toString() === targetUserId)

                    if (index >= 0) {
                        likes.splice(index, 1)
                    }

                    return User.updateOne({ _id: userId }, { $set: { likes } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}
