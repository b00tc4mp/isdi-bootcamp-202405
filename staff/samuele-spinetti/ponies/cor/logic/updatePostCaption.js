import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, postId, caption) => {
    validate.string(userId, 'UserId')
    validate.postId(postId)
    validate.string(caption)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('Post not found')

                    return Post.updateOne({ _id: postId }, { $set: { caption } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}