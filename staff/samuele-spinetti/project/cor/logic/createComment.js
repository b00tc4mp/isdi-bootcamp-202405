import { User, Post, Comment } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.string(text, 'text')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    return Comment.create({
                        text,
                        author: userId,
                        post: post._id
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })

                .then(() => { })
        })
}