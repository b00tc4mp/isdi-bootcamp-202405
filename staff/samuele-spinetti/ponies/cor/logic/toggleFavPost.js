import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId, 'UserId')
    validate.postId(postId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('Post not found')

                    const { favs } = user

                    const index = favs.findIndex(postObjectId => postObjectId.toString() === postId)

                    if (index < 0)
                        favs.push(postId)
                    else
                        favs.splice(index, 1)

                    return User.updateOne({ _id: userId }, { $set: { favs } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}