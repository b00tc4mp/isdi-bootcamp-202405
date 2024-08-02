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
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')


                    const index = post.likes.findIndex(userObjectId => userObjectId.toString() === user._id.toString())

                    if (index < 0) {
                        post.likes.push(user._id)
                    } else {
                        post.likes.splice(index, 1)
                    }

                    return Post.updateOne({ _id: postId }, { $set: { likes: post.likes } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => {
                            const postIndex = user.likes.findIndex(id => id.toString() === postId)

                            if (postIndex !== -1) {
                                user.likes.splice(postIndex, 1)
                            } else {
                                user.likes.push(post._id)
                            }

                            return User.updateOne({ username }, { $set: { likes: user.likes } })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
        .then(() => { })
}