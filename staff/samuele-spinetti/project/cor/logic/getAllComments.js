import { User, Post, Comment } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    return Comment.find({ post: postId }).sort({ date: -1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comments => {
                            return comments.map(comment => ({
                                id: comment._id.toString(),
                                author: comment.author,
                                text: comment.text,
                                post: comment.post,
                                date: comment.date
                            }))
                        })
                })
        })
}