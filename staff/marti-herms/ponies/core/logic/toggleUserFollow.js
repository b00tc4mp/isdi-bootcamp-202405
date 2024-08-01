import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OutOfBoundsError, SystemError, CorruptedInfoError } = errors

export default (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    return User.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.username === targetUsername)
                throw new OutOfBoundsError('tried following yourself')

            return User.findOne({ username: targetUsername }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser)
                        throw new NotFoundError('targetUser not found')

                    const followingIndex = user.following.findIndex(userObjectId => userObjectId.toString() === targetUser._id.toString())

                    const followerIndex = targetUser.followers.findIndex(userObjectId => userObjectId.toString() === user._id.toString())

                    if ((followingIndex === -1 && followerIndex !== -1) || (followerIndex === -1 && followingIndex !== -1))
                        throw new CorruptedInfoError('wrong saved information')


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

                    return User.updateOne({ username }, { $set: { following: user.following } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => {
                            return User.updateOne({ username: targetUsername }, { $set: { followers: targetUser.followers } })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
        .then(() => { })
}