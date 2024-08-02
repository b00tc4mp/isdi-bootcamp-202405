import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId, 'userId')
    validate.string(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId)
                        throw new OwnershipError('user is not author')
                })
        })
        .then(() =>
            Post.findByIdAndDelete(postId)
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}