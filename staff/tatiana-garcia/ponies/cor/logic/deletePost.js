import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (username, postId) => {
    validate.username(username, 'username')
    validate.postId(postId)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            if (post.author !== username) throw new OwnershipError('post does not belong to user')

            return Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}