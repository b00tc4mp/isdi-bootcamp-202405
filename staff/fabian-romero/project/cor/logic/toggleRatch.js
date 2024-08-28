import { User, Match, Like } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.string(userId, 'userId')
    validate.string(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.findById(targetUserId).lean()
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('Target user not found')

                    return Like.findOne({ userId, likedUserId: targetUserId }).lean()
                        .then(existingLike => {
                            if (existingLike) {
                                throw new Error('Like already exists')
                            }

                            return Like.create({ userId, likedUserId: targetUserId })
                                .then(() => {
                                    return Like.findOne({
                                        $or: [
                                            { userId, likedUserId: targetUserId },
                                            { userId: targetUserId, likedUserId: userId }
                                        ]
                                    }).lean()
                                })
                                .then(isMutualLike => {
                                    if (isMutualLike) {
                                        return Match.create({ user1: userId, user2: targetUserId })
                                            .then(() => ({
                                                message: 'It\'s a match!',
                                                match: { user1: userId, user2: targetUserId }
                                            }))
                                    }

                                    return { message: 'Like registrado.' }
                                })
                        })
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}
