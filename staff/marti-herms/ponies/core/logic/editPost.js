import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, postId, newCaption) => {
    validate.string(userId, 'userId')
    validate.string(postId, 'postId')
    validate.string(newCaption, 'newCaption')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId)
                        throw new OwnershipError('post is not from user')

                    if (post.caption !== newCaption) {
                        return Post.findByIdAndUpdate(postId, { caption: newCaption })
                            .catch(error => { throw new SystemError(error.message) })
                    }
                })
        })
        .then(() => { })
}