import { User, Comment } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, commentId) => {
    validate.string(userId, 'userId')
    validate.string(commentId, 'commentId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Comment.findById(commentId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(comment => {
            if (!comment) throw new NotFoundError('comment not found')

            if (comment.author.toString() !== userId) throw new OwnershipError('comment does not belong to user')

            return Comment.deleteOne({ _id: commentId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}