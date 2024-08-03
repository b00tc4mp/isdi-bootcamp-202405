import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnerShipError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId, 'UserId')
    validate.postId(postId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('Post not found')

            if (post.author.toString() !== userId) throw new OwnerShipError('Post does not belong to user')

            return Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}