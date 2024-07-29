import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnerShipError, SystemError } = errors

export default (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
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

                    if (post.author !== username) {
                        callback(new OwnerShipError('Post does not belong to user'))
                    }

                    Post.deleteOne({ _id: postId })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}