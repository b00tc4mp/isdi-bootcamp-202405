import { User } from '../data/models.js'

import { validate } from 'com'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            if (user.username === targetUsername) {
                callback(new Error('you can\'t follow yourself'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(targetUser => {
                    const followingIndex = user.following.findIndex(userObjectId => userObjectId === targetUser._id)

                    const followerIndex = targetUser.followers.findIndex(userObjectId => userObjectId === user._id)

                    if ((followingIndex === -1 && followerIndex !== -1) || (followerIndex === -1 && followingIndex !== -1)) {
                        callback(new Error('something is wrong'))

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

                    data.users.updateOne({ username }, { $set: { following: user.following } })
                        .then(() => {
                            data.users.updateOne({ username: targetUsername }, { $set: { followers: targetUser.followers } })
                                .then(() => callback(null))
                                .catch(error => callback(new Error(error.message)))
                        })
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))

        })
        .catch(error => callback(new Error(error.message)))
}