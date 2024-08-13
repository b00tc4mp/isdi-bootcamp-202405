import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, postId, caption) => {
    validate.string(userId, 'userId')
    validate.string(postId, 'postId')
    validate.string(caption, 'caption')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId) throw new OwnershipError('post does not belong to user')

                    return Post.updateOne({ _id: postId }, { $set: { caption } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}