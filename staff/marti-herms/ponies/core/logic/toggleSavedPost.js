import data from '../data/index.js'

import validate from '../validate.js'

const toggleSavedPost = (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            const postIndex = user.savedPosts.findIndex(id => id === postId)

            if (postIndex !== -1) {
                user.savedPosts.splice(postIndex, 1)
            } else {
                user.savedPosts.push(postId)
            }

            data.users.updateOne({ username }, { $set: { savedPosts: user.savedPosts } })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}

export default toggleSavedPost