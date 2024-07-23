import data from '../data/index.js'
import validate from '../../app/validate.js'

const updatePostCaption = (username, postId, caption, callback) => {
    validate.username(username,)
    validate.postId(postId, 'postId')
    validate.string(caption, 'caption')
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

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (!post) {
                callback(new Error('post not found'))

                return
            }

            post.caption = caption

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

export default updatePostCaption