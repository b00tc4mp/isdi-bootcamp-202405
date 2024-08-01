
import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, postId) => {
    validate.username(username)
    validate.string(postId, 'postId')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post)
                throw new NotFoundError('post not found')

            const { likes } = post

            const index = likes.indexOf(username)

            if (index < 0)
                likes.push(username)
            else
                likes.splice(index, 1)

            return Post.updateOne({ _id: postId }, { $set: { likes } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}