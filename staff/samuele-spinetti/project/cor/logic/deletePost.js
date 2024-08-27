import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnerShipError, SystemError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')
            else if (post.author.toString() !== userId) throw new OwnerShipError('post does not belong to user')

            return Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}