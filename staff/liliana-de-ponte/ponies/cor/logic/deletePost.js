import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError, OwnerShipError } = errors

export default (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
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
                        callback(new NotFoundError('post not found'))

                        return
                    }

                    if (post.author !== username) {
                        callback(new OwnerShipError('post not belong to user'))

                        return

                    }

                    Post.deleteOne({ _id: postId })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))

                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
