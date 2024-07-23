import data from '../data/index.js'

import validate from '../validate.js'

const deletePost = (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('User not found'))

            return
        }

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (post === null) {
                callback(new Error('Post not found'))

                return
            }

            data.deletePost(post => post.id === postId, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

export default deletePost