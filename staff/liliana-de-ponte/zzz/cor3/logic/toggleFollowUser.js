import data from '../data/index.js'

import validate from '../validate.js'

function toggleFollowUser(username, targetUsername, callback) {
    validate.username(username)
    validate.username(targetUsername, 'targetUserName')
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, following) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (!following) {
                callback(new Error('following user not found'))

                return
            }

            const index = user.following.indexOf(targetUsername)

            if (index < 0)
                user.following.push(targetUsername)
            else
                user.following.splice(index, 1)

            data.updateUser(user => user.username === username, user, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })

    })
}

export default toggleFollowUser