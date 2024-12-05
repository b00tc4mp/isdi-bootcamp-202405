import data from '../data/index.js'

import validate from '../validate.js'

const toggleUserFollow = (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }
        if (user === null) {
            callback(new Error('user not found'))

            return
        }

        if (user.username === targetUsername) {
            callback(new Error('you can\'t follow yourself'))

            return
        }

        const targetUser = data.findUser(user => user.username === targetUsername, (error, user) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

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


            data.updateUser(user => user.username === username, user, (error) => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                data.updateUser(user => user.username === targetUsername, targetUser, (error) => {
                    if (error) {
                        callback(new Error(error.message))

                        return
                    }

                    callback(null)
                })
            })
        })
    })
}

export default toggleUserFollow