import { User, Comment } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnerShipError, SystemError } = errors

export default (userId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(commentId, 'commentId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Comment.findById(commentId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(comment => {
            if (!comment) throw new NotFoundError('comment not found')
            else if (comment.author.toString() !== userId) throw new OwnerShipError('comment does not belong to user')

            return Comment.deleteOne({ _id: commentId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}