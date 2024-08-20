import { User, Comment, Post } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, postId, text) => {
    validate.string(userId, 'userId')
    validate.string(postId, 'postId')
    validate.string(text, 'text')

    if (!text) throw new ValidationError('invalid text')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    const comment = {
                        author: userId,
                        text: text,
                        post: postId
                    }

                    return Comment.create(comment)
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}