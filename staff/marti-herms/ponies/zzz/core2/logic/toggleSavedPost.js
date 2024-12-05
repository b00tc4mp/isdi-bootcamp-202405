import data from '../data/index.js'

import validate from '../validate.js'

const toggleSavedPost = (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
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

        const postIndex = user.savedPosts.findIndex(id => id === postId)

        if (postIndex !== -1) {
            user.savedPosts.splice(postIndex, 1)
        } else {
            user.savedPosts.push(postId)
        }

        data.updateUser(user => user.username === username, user, (error) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            callback(null)
        })
    })
}

export default toggleSavedPost