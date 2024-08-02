import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError, CorruptedInfoError } = errors

export default (userId, targetUserId) => {
    validate.string(userId, 'userId')
    validate.string(targetUserId, 'targetUserId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser)
                        throw new NotFoundError('targetUser not found')

                    const followingIndex = user.following.findIndex(userObjectId => userObjectId.toString() === targetUserId)

                    const followerIndex = targetUser.followers.findIndex(userObjectId => userObjectId.toString() === userId)

                    if (followingIndex !== -1) {
                        user.following.splice(followingIndex, 1)
                    } else {
                        user.following.push(targetUser._id)
                    }

                    if (followerIndex !== -1) {
                        targetUser.followers.splice(followerIndex, 1)
                    } else {
                        targetUser.followers.push(user._id)
                    }

                    return User.findByIdAndUpdate(userId, { following: user.following })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => {
                            return User.findByIdAndUpdate(targetUserId, { followers: targetUser.followers })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
        .then(() => { })
}