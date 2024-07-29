import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OutOfBoundsError, SystemError, CorruptedInfoError } = errors

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            if (user.username === targetUsername) {
                callback(new OutOfBoundsError('tried following yourself'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new NotFoundError('targetUser not found'))

                        return
                    }
                    const followingIndex = user.following.findIndex(userObjectId => userObjectId.toString() === targetUser._id.toString())

                    const followerIndex = targetUser.followers.findIndex(userObjectId => userObjectId.toString() === user._id.toString())

                    if ((followingIndex === -1 && followerIndex !== -1) || (followerIndex === -1 && followingIndex !== -1)) {
                        callback(new CorruptedInfoError('wrong saved information'))

                        return
                    }

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

                    User.updateOne({ username }, { $set: { following: user.following } })
                        .then(() => {
                            User.updateOne({ username: targetUsername }, { $set: { followers: targetUser.followers } })
                                .then(() => callback(null))
                                .catch(error => callback(new SystemError(error.message)))
                        })
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}