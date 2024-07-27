import { User, Post } from '../data/models.js'
import { validate } from 'com'

export default (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('Post not found'))

                        return
                    }

                    if (post.author !== username) {
                        callback(new Error('Post does not belong to user'))
                    }

                    Post.deleteOne({ _id: postId })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}