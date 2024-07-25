import data from '../data/index.js'

import { validate } from 'com'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            if (user.username === targetUsername) {
                callback(new Error('you can\'t follow yourself'))

                return
            }

            data.users.findOne({ username: targetUsername })
                .then(targetUser => {
                    const followingIndex = user.following.findIndex(username => username === targetUsername)

                    const followerIndex = targetUser.followers.findIndex(username => username === user.username)

                    if ((followingIndex === -1 && followerIndex !== -1) || (followerIndex === -1 && followingIndex !== -1)) {
                        callback(new Error('something is wrong'))

                        return
                    }

                    if (followingIndex !== -1) {
                        user.following.splice(followingIndex, 1)
                    } else {
                        user.following.push(targetUsername)
                    }

                    if (followerIndex !== -1) {
                        targetUser.followers.splice(followerIndex, 1)
                    } else {
                        targetUser.followers.push(user.username)
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