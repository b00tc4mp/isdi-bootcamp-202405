import data from '../data/index.js'
import validate from '../validate.js'

const toggleLikePost = (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
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

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (!post) {
                callback(new Error('post not found'))

                return
            }

            const index = post.likes.indexOf(username)

            if (index < 0)
                post.likes.push(username)
            else
                post.likes.splice(index, 1)

            data.updatePost(post => post.id === postId, post, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

export default toggleLikePost