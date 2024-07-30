import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (username, postId, caption, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.string(caption)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'))

                return
            }

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('Post not found'))

                        return
                    }

                    Post.updateOne({ _id: postId }, { $set: { caption } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}