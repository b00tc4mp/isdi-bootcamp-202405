import data from '../data/index.js'

import validate from '../validate.js'

const togglePostLike = (username, postId, callback) => {
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

        if (postId.trim().length === 0) {
            callback(new Error('invalid postId'))

            return
        }

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (post === null) {
                callback(new Error('post not found'))

                return
            }

            const index = post.likes.indexOf(username)

            if (index < 0) {
                post.likes.push(username)
            } else {
                post.likes.splice(index, 1)
            }

            data.updatePost(post => post.id === postId, post, (error) => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                const postIndex = user.likedPosts.findIndex(id => id === postId)

                if (postIndex !== -1) {
                    user.likedPosts.splice(postIndex, 1)
                } else {
                    user.likedPosts.push(postId)
                }

                data.updateUser(user => user.username === username, user, (error) => {
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

export default togglePostLike