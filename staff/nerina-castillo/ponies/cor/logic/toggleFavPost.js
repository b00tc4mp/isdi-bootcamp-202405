import { User, Post } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId, 'userId')
    validate.string(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

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