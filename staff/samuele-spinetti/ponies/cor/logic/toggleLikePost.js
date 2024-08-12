import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId, 'UserId')
    validate.postId(postId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post)
                throw new NotFoundError('Post not found')

            const { likes } = post

            const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return Post.updateOne({ _id: postId }, { $set: { likes } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}