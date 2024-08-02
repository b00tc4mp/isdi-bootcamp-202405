import { ObjectId } from 'mongoose'
import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.string(userId)
    validate.string(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')

                    const postIndex = user.favs.findIndex(id => id.toString() === postId)

                    if (postIndex !== -1) {
                        user.favs.splice(postIndex, 1)
                    } else {
                        user.favs.push(post._id)
                    }

                    return User.findByIdAndUpdate(userId, { favs: user.favs })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}