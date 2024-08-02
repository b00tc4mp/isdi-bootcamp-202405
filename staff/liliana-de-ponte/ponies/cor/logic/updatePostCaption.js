import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError, OwnerShipError } = errors

export default (username, postId, caption) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.string(caption, 'caption')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (post.author !== username) throw new OwnerShipError('post not belong to user')

                    return Post.updateOne({ _id: postId }, { $set: { caption } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}
