import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('targetUser not found')

                    if (user.following.some(userObjectId => userObjectId.toString() === targetUserId))
                        return User.findByIdAndUpdate(userId, { $pull: { following: targetUser._id } })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(() => User.findByIdAndUpdate(targetUserId, { $pull: { followers: user._id } }))
                    else
                        return User.findByIdAndUpdate(userId, { $push: { following: targetUser._id } })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(() => User.findByIdAndUpdate(targetUserId, { $push: { followers: user._id } }))
                })
        })
        .then(() => { })
}